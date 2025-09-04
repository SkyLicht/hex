// Convert timestamp to seconds within the hour
import { DeltasModel } from '@/src/types/hex_api'

const convertTimestampToSeconds = (timestamp: string): number => {
    const date = new Date(timestamp)
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return minutes * 60 + seconds
}

// Get hour from timestamp
const getHour = (timestamp: string): number => {
    return new Date(timestamp).getHours()
}

// Process deltas to handle cross-hour cases
export const ProcessDeltas = (deltas: DeltasModel[]) => {
    const hourlyDeltas: Record<
        number,
        {
            metrics: {
                duration: number
            }
            deltas: Array<{
                startSeconds: number
                endSeconds: number
                duration: number
                originalDelta: DeltasModel
                type: 'complete' | 'start' | 'end' | 'cross'
            }>
        }
    > = {}

    deltas.forEach((delta) => {
        const startHour = getHour(delta.from_timestamp)
        const endHour = getHour(delta.to_timestamp)

        if (startHour === endHour) {
            // Same hour - normal case
            const startSeconds = convertTimestampToSeconds(delta.from_timestamp)
            const endSeconds = convertTimestampToSeconds(delta.to_timestamp)

            if (!hourlyDeltas[startHour]) {
                hourlyDeltas[startHour] = {
                    metrics: { duration: 0 },
                    deltas: [],
                }
            }

            const deltaEntry = {
                startSeconds,
                endSeconds,
                duration: delta.delta_seconds,
                originalDelta: delta,
                type: 'complete' as const,
            }

            hourlyDeltas[startHour].deltas.push(deltaEntry)
            hourlyDeltas[startHour].metrics.duration += delta.delta_seconds
        } else {
            // Cross-hour case
            const startSeconds = convertTimestampToSeconds(delta.from_timestamp)
            const endSeconds = convertTimestampToSeconds(delta.to_timestamp)
            const startHourDuration = 3600 - startSeconds
            const endHourDuration = endSeconds

            // Add to start hour (from start time to end of hour)
            if (!hourlyDeltas[startHour]) {
                hourlyDeltas[startHour] = {
                    metrics: { duration: 0 },
                    deltas: [],
                }
            }

            const startEntry = {
                startSeconds,
                endSeconds: 3600, // End of hour
                duration: startHourDuration,
                originalDelta: delta,
                type: 'start' as const,
            }

            hourlyDeltas[startHour].deltas.push(startEntry)
            hourlyDeltas[startHour].metrics.duration += startHourDuration

            // Add to end hour (from start of hour to end time)
            if (!hourlyDeltas[endHour]) {
                hourlyDeltas[endHour] = {
                    metrics: { duration: 0 },
                    deltas: [],
                }
            }

            const endEntry = {
                startSeconds: 0, // Start of hour
                endSeconds,
                duration: endHourDuration,
                originalDelta: delta,
                type: 'end' as const,
            }

            hourlyDeltas[endHour].deltas.push(endEntry)
            hourlyDeltas[endHour].metrics.duration += endHourDuration

            // Add to any hours in between (full hour gaps)
            for (let hour = startHour + 1; hour < endHour; hour++) {
                if (!hourlyDeltas[hour]) {
                    hourlyDeltas[hour] = {
                        metrics: { duration: 0 },
                        deltas: [],
                    }
                }

                const crossEntry = {
                    startSeconds: 0,
                    endSeconds: 3600,
                    duration: 3600,
                    originalDelta: delta,
                    type: 'cross' as const,
                }

                hourlyDeltas[hour].deltas.push(crossEntry)
                hourlyDeltas[hour].metrics.duration += 3600
            }
        }
    })

    return hourlyDeltas
}
export const TransformUnitsToDeltas = (
    units: Array<{
        ppid: string
        collected_timestamp: string
        model_name: string
        line_name: string
        group_name: string
        next_station: string
        error_flag: number
    }>
): DeltasModel[] => {
    if (units.length === 0) {
        return []
    }

    // Sort units by collected_timestamp
    const sortedUnits = [...units].sort(
        (a, b) =>
            new Date(a.collected_timestamp).getTime() -
            new Date(b.collected_timestamp).getTime()
    )

    const deltas: DeltasModel[] = []

    // Get the hour from the first unit (assuming all units are from the same hour)
    const firstUnit = sortedUnits[0]
    const firstTime = new Date(firstUnit.collected_timestamp)
    const hour = firstTime.getHours()

    // Helper function to format date as local timestamp string
    const formatLocalTimestamp = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    // Create start of hour timestamp (hour:00:00)
    const startOfHour = new Date(firstTime)
    startOfHour.setMinutes(0, 0, 0)
    const startOfHourString = formatLocalTimestamp(startOfHour)

    // Create end of hour timestamp (hour:59:59)
    const endOfHour = new Date(firstTime)
    endOfHour.setHours(hour, 59, 59, 999)
    const endOfHourString = formatLocalTimestamp(endOfHour)

    // Add first delta: from start of hour to first record
    const startGapSeconds = Math.floor(
        (firstTime.getTime() - startOfHour.getTime()) / 1000
    )
    const startGapMinutes = Math.floor(startGapSeconds / 60)

    const firstDelta: DeltasModel = {
        delta_minute: startGapMinutes,
        delta_seconds: startGapSeconds,
        from_ppid: 'start',
        from_timestamp: startOfHourString,
        hour_by_hour: hour,
        to_ppid: firstUnit.ppid,
        to_timestamp: firstUnit.collected_timestamp,
    }
    deltas.push(firstDelta)

    // Create consecutive pairs: each unit with the next unit
    for (let i = 0; i < sortedUnits.length - 1; i++) {
        const fromUnit = sortedUnits[i]
        const toUnit = sortedUnits[i + 1]

        // Calculate delta values
        const fromTime = new Date(fromUnit.collected_timestamp)
        const toTime = new Date(toUnit.collected_timestamp)

        const deltaSeconds = Math.floor(
            (toTime.getTime() - fromTime.getTime()) / 1000
        )
        const deltaMinutes = Math.floor(deltaSeconds / 60)

        const delta: DeltasModel = {
            delta_minute: deltaMinutes,
            delta_seconds: deltaSeconds,
            from_ppid: fromUnit.ppid,
            from_timestamp: fromUnit.collected_timestamp,
            hour_by_hour: fromTime.getHours(),
            to_ppid: toUnit.ppid,
            to_timestamp: toUnit.collected_timestamp,
        }

        deltas.push(delta)
    }

    // Add last delta: from last record to end of hour
    const lastUnit = sortedUnits[sortedUnits.length - 1]
    const lastTime = new Date(lastUnit.collected_timestamp)

    const endGapSeconds = Math.floor(
        (endOfHour.getTime() - lastTime.getTime()) / 1000
    )
    const endGapMinutes = Math.floor(endGapSeconds / 60)

    const lastDelta: DeltasModel = {
        delta_minute: endGapMinutes,
        delta_seconds: endGapSeconds,
        from_ppid: lastUnit.ppid,
        from_timestamp: lastUnit.collected_timestamp,
        hour_by_hour: hour,
        to_ppid: 'end',
        to_timestamp: endOfHourString,
    }
    deltas.push(lastDelta)

    return deltas
}

export const ProcessUnitsToDeltas = (
    units: Array<{
        ppid: string
        collected_timestamp: string
        model_name: string
        line_name: string
        group_name: string
        next_station: string
        error_flag: number
    }>
): {
    metrics: {
        duration: number
    }
    deltas: Array<{
        startSeconds: number
        endSeconds: number
        duration: number
        originalDelta: DeltasModel
        type: 'complete' | 'start' | 'end' | 'cross'
    }>
} => {
    const deltas = TransformUnitsToDeltas(units)

    const hourlyData: {
        metrics: { duration: number }
        deltas: Array<{
            startSeconds: number
            endSeconds: number
            duration: number
            originalDelta: DeltasModel
            type: 'complete' | 'start' | 'end' | 'cross'
        }>
    } = {
        metrics: { duration: 0 },
        deltas: [],
    }

    deltas.forEach((delta) => {
        // Skip deltas that don't have valid to_timestamp (unpaired units)
        if (delta.to_timestamp === 'none') {
            return
        }

        const startHour = getHour(delta.from_timestamp)
        const endHour = getHour(delta.to_timestamp)

        // Determine type based on special PPIDs
        let deltaType: 'complete' | 'start' | 'end' | 'cross' = 'complete'

        if (delta.from_ppid === 'start') {
            deltaType = 'end'
        } else if (delta.to_ppid === 'end') {
            deltaType = 'start'
        }

        if (startHour === endHour) {
            // Same hour - normal case
            const startSeconds = convertTimestampToSeconds(delta.from_timestamp)
            const endSeconds = convertTimestampToSeconds(delta.to_timestamp)

            const deltaEntry = {
                startSeconds,
                endSeconds,
                duration: delta.delta_seconds,
                originalDelta: delta,
                type: deltaType,
            }

            hourlyData.deltas.push(deltaEntry)
            hourlyData.metrics.duration += delta.delta_seconds
        } else {
            // Cross-hour case
            const startSeconds = convertTimestampToSeconds(delta.from_timestamp)
            const endSeconds = convertTimestampToSeconds(delta.to_timestamp)
            const startHourDuration = 3600 - startSeconds
            const endHourDuration = endSeconds

            // Add to start hour (from start time to end of hour)
            const startEntry = {
                startSeconds,
                endSeconds: 3600, // End of hour
                duration: startHourDuration,
                originalDelta: delta,
                type:
                    delta.from_ppid === 'start'
                        ? ('start' as const)
                        : ('start' as const),
            }

            hourlyData.deltas.push(startEntry)
            hourlyData.metrics.duration += startHourDuration

            // Add to end hour (from start of hour to end time)
            const endEntry = {
                startSeconds: 0, // Start of hour
                endSeconds,
                duration: endHourDuration,
                originalDelta: delta,
                type:
                    delta.to_ppid === 'end'
                        ? ('end' as const)
                        : ('end' as const),
            }

            hourlyData.deltas.push(endEntry)
            hourlyData.metrics.duration += endHourDuration

            // Add to any hours in between (full hour gaps)
            for (let hour = startHour + 1; hour < endHour; hour++) {
                const crossEntry = {
                    startSeconds: 0,
                    endSeconds: 3600,
                    duration: 3600,
                    originalDelta: delta,
                    type: 'cross' as const,
                }

                hourlyData.deltas.push(crossEntry)
                hourlyData.metrics.duration += 3600
            }
        }
    })

    return hourlyData
}
