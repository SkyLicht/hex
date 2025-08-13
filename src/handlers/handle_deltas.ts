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
