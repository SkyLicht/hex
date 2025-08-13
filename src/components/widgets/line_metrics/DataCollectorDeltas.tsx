'use client'
import React from 'react'
import { useGetDeltas } from '@/src/hooks/use_analytics'

interface DataCollectorDeltasProps {
    dataCollector: string
}
const DataCollectorDeltas = () => {
    const { data, isError, isLoading } = useGetDeltas()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    if (!data) return <div>No data</div>

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

    // Scale seconds to fit screen width
    const TIMELINE_WIDTH = 1300
    const scaleSecondToPixel = (seconds: number): number => {
        return (seconds / 3600) * TIMELINE_WIDTH
    }

    // Process deltas to handle cross-hour cases
    const processDeltas = () => {
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

        data.deltas.forEach((delta) => {
            const startHour = getHour(delta.from_timestamp)
            const endHour = getHour(delta.to_timestamp)

            if (startHour === endHour) {
                // Same hour - normal case
                const startSeconds = convertTimestampToSeconds(
                    delta.from_timestamp
                )
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
                const startSeconds = convertTimestampToSeconds(
                    delta.from_timestamp
                )
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

    const hourlyDeltas = processDeltas()

    return (
        <div className={'w-full h-full flex flex-col p-4 overflow-y-auto'}>
            {/* Legend at top - only shown once */}
            <div className={'mb-6 bg-gray-700 rounded-lg p-4'}>
                <div
                    className={
                        'flex flex-wrap items-center gap-6 text-xs text-stone-300'
                    }
                >
                    <div className={'flex items-center gap-2'}>
                        <div className={'w-3 h-3 bg-yellow-500 rounded'}></div>
                        <span>&lt;10s</span>
                    </div>
                    <div className={'flex items-center gap-2'}>
                        <div className={'w-3 h-3 bg-yellow-600 rounded'}></div>
                        <span>10-29s</span>
                    </div>
                    <div className={'flex items-center gap-2'}>
                        <div className={'w-3 h-3 bg-orange-600 rounded'}></div>
                        <span>30-59s</span>
                    </div>
                    <div className={'flex items-center gap-2'}>
                        <div className={'w-3 h-3 bg-red-600 rounded'}></div>
                        <span>≥1min</span>
                    </div>
                    <div
                        className={
                            'text-stone-400 border-l border-stone-600 pl-4'
                        }
                    >
                        Patterns: → starts here | ← ends here | ↔ crosses
                        completely
                    </div>
                </div>
            </div>

            {/* Hours stacked vertically */}
            {Object.entries(hourlyDeltas)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([hour, deltas]) => {
                    const totalDuration = deltas.reduce(
                        (sum, d) => sum + d.duration,
                        0
                    )

                    return (
                        <div key={hour} className={'mb-4'}>
                            <div
                                className={
                                    'flex flex-row items-center justify-between mb-2'
                                }
                            >
                                <h3
                                    className={
                                        'text-lg font-semibold text-stone-200'
                                    }
                                >
                                    Hour {hour}:00 - {hour}:59
                                </h3>
                                <div className={'text-sm text-stone-400'}>
                                    {deltas.length} segments | Total:{' '}
                                    {Math.round(totalDuration)}s
                                </div>
                            </div>

                            <div className={'bg-gray-800 rounded-lg p-4'}>
                                <svg
                                    width={TIMELINE_WIDTH}
                                    height="80"
                                    className={'w-full'}
                                >
                                    {/* Background representing the full hour */}
                                    <rect
                                        width={TIMELINE_WIDTH}
                                        height="60"
                                        y="10"
                                        fill="#374151"
                                        rx="4"
                                    />

                                    {/* Time markers (every 10 minutes) */}
                                    {[0, 10, 20, 30, 40, 50, 60].map(
                                        (minute) => {
                                            const x = scaleSecondToPixel(
                                                minute * 60
                                            )
                                            return (
                                                <g key={minute}>
                                                    <line
                                                        x1={x}
                                                        y1={10}
                                                        x2={x}
                                                        y2={70}
                                                        stroke="#6b7280"
                                                        strokeWidth="1"
                                                        strokeDasharray="2,2"
                                                    />
                                                    <text
                                                        x={x}
                                                        y={8}
                                                        textAnchor="middle"
                                                        fontSize="10"
                                                        fill="#9ca3af"
                                                    >
                                                        :
                                                        {minute
                                                            .toString()
                                                            .padStart(2, '0')}
                                                    </text>
                                                </g>
                                            )
                                        }
                                    )}

                                    {/* Render gap segments */}
                                    {deltas.map((deltaSegment, index) => {
                                        const x = scaleSecondToPixel(
                                            deltaSegment.startSeconds
                                        )
                                        const width = Math.max(
                                            scaleSecondToPixel(
                                                deltaSegment.endSeconds -
                                                    deltaSegment.startSeconds
                                            ),
                                            3
                                        )

                                        // Color based on segment duration
                                        const getSegmentStyle = (
                                            type: string,
                                            duration: number
                                        ) => {
                                            const baseColor =
                                                duration >= 60
                                                    ? '#dc2626'
                                                    : duration >= 30
                                                      ? '#ea580c'
                                                      : duration >= 10
                                                        ? '#eab308'
                                                        : '#f59e0b'

                                            switch (type) {
                                                case 'complete':
                                                    return {
                                                        fill: baseColor,
                                                        opacity: 0.8,
                                                        pattern: null,
                                                    }
                                                case 'start':
                                                    return {
                                                        fill: baseColor,
                                                        opacity: 0.9,
                                                        pattern:
                                                            'url(#rightStripes)',
                                                    }
                                                case 'end':
                                                    return {
                                                        fill: baseColor,
                                                        opacity: 0.9,
                                                        pattern:
                                                            'url(#leftStripes)',
                                                    }
                                                case 'cross':
                                                    return {
                                                        fill: baseColor,
                                                        opacity: 0.7,
                                                        pattern:
                                                            'url(#crossStripes)',
                                                    }
                                                default:
                                                    return {
                                                        fill: baseColor,
                                                        opacity: 0.8,
                                                        pattern: null,
                                                    }
                                            }
                                        }

                                        const style = getSegmentStyle(
                                            deltaSegment.type,
                                            deltaSegment.duration
                                        )

                                        return (
                                            <g key={index}>
                                                {/* Patterns for cross-hour indicators */}
                                                <defs>
                                                    <pattern
                                                        id="rightStripes"
                                                        patternUnits="userSpaceOnUse"
                                                        width="4"
                                                        height="4"
                                                    >
                                                        <path
                                                            d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2"
                                                            stroke="#ffffff"
                                                            strokeWidth="0.5"
                                                            opacity="0.3"
                                                        />
                                                    </pattern>
                                                    <pattern
                                                        id="leftStripes"
                                                        patternUnits="userSpaceOnUse"
                                                        width="4"
                                                        height="4"
                                                    >
                                                        <path
                                                            d="M 0,0 l 4,4 M -1,3 l 2,2 M 3,-1 l 2,2"
                                                            stroke="#ffffff"
                                                            strokeWidth="0.5"
                                                            opacity="0.3"
                                                        />
                                                    </pattern>
                                                    <pattern
                                                        id="crossStripes"
                                                        patternUnits="userSpaceOnUse"
                                                        width="4"
                                                        height="4"
                                                    >
                                                        <path
                                                            d="M 0,0 l 4,4 M 0,4 l 4,-4"
                                                            stroke="#ffffff"
                                                            strokeWidth="0.5"
                                                            opacity="0.2"
                                                        />
                                                    </pattern>
                                                </defs>

                                                <rect
                                                    x={x}
                                                    y={15}
                                                    width={width}
                                                    height={50}
                                                    fill={
                                                        style.pattern ||
                                                        style.fill
                                                    }
                                                    opacity={style.opacity}
                                                    rx="2"
                                                />

                                                {/* Duration text for larger segments */}
                                                {width > 40 && (
                                                    <text
                                                        x={x + width / 2}
                                                        y={45}
                                                        textAnchor="middle"
                                                        fontSize="12"
                                                        fill="white"
                                                        fontWeight="bold"
                                                    >
                                                        {Math.round(
                                                            deltaSegment.duration
                                                        )}
                                                        s
                                                    </text>
                                                )}

                                                {/* Type indicator */}
                                                {deltaSegment.type !==
                                                    'complete' &&
                                                    width > 60 && (
                                                        <text
                                                            x={x + width / 2}
                                                            y={58}
                                                            textAnchor="middle"
                                                            fontSize="9"
                                                            fill="white"
                                                            opacity={0.8}
                                                        >
                                                            {deltaSegment.type ===
                                                            'start'
                                                                ? '→'
                                                                : deltaSegment.type ===
                                                                    'end'
                                                                  ? '←'
                                                                  : '↔'}
                                                        </text>
                                                    )}
                                            </g>
                                        )
                                    })}
                                </svg>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default DataCollectorDeltas
