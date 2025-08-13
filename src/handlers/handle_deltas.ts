// Convert timestamp to seconds within the hour
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
const processDeltas = (
    deltas: {
        delta_minute: number
        delta_seconds: number
        from_ppid: string
        from_timestamp: string
        hour_by_hour: 14
        to_ppid: string
        to_timestamp: string
    }[]
) => {
    const hourlyDeltas: Record<
        number,
        Array<{
            startSeconds: number
            endSeconds: number
            duration: number
            originalDelta: (typeof data.deltas)[0]
            type: 'complete' | 'start' | 'end' | 'cross'
        }>
    > = {}

    deltas.forEach((delta) => {
        const startHour = getHour(delta.from_timestamp)
        const endHour = getHour(delta.to_timestamp)

        if (startHour === endHour) {
            // Same hour - normal case
            const startSeconds = convertTimestampToSeconds(delta.from_timestamp)
            const endSeconds = convertTimestampToSeconds(delta.to_timestamp)

            if (!hourlyDeltas[startHour]) hourlyDeltas[startHour] = []
            hourlyDeltas[startHour].push({
                startSeconds,
                endSeconds,
                duration: delta.delta_seconds,
                originalDelta: delta,
                type: 'complete',
            })
        } else {
            // Cross-hour case
            const startSeconds = convertTimestampToSeconds(delta.from_timestamp)
            const endSeconds = convertTimestampToSeconds(delta.to_timestamp)

            // Add to start hour (from start time to end of hour)
            if (!hourlyDeltas[startHour]) hourlyDeltas[startHour] = []
            hourlyDeltas[startHour].push({
                startSeconds,
                endSeconds: 3600, // End of hour
                duration: 3600 - startSeconds,
                originalDelta: delta,
                type: 'start',
            })

            // Add to end hour (from start of hour to end time)
            if (!hourlyDeltas[endHour]) hourlyDeltas[endHour] = []
            hourlyDeltas[endHour].push({
                startSeconds: 0, // Start of hour
                endSeconds,
                duration: endSeconds,
                originalDelta: delta,
                type: 'end',
            })

            // Add to any hours in between (full hour gaps)
            for (let hour = startHour + 1; hour < endHour; hour++) {
                if (!hourlyDeltas[hour]) hourlyDeltas[hour] = []
                hourlyDeltas[hour].push({
                    startSeconds: 0,
                    endSeconds: 3600,
                    duration: 3600,
                    originalDelta: delta,
                    type: 'cross',
                })
            }
        }
    })

    return hourlyDeltas
}
