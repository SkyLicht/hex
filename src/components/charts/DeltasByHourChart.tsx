import React from 'react'
import { DeltasModel } from '@/src/types/hex_api'

interface Props {
    data: Record<
        number,
        {
            metrics: { duration: number }
            deltas: Array<{
                startSeconds: number
                endSeconds: number
                duration: number
                originalDelta: DeltasModel
                type: 'complete' | 'start' | 'end' | 'cross'
            }>
        }
    >
}

const DeltasByHourChart = ({ data }: Props) => {
    // Scale seconds to fit screen width
    const TIMELINE_WIDTH = 1100
    const LABEL_WIDTH = 60 // Width for hour and qy labels
    const scaleSecondToPixel = (seconds: number): number => {
        return (seconds / 3600) * TIMELINE_WIDTH
    }

    // Dynamic configuration
    const OFFSET = 20
    const BACKGROUND_HEIGHT = 26
    const DELTA_HEIGHT = 22
    const ROW_SPACING = BACKGROUND_HEIGHT + 0 // 4px gap between rows
    const PADDING_Y = (BACKGROUND_HEIGHT - DELTA_HEIGHT) / 2 // Center deltas in background

    // Color configuration - easy to modify
    const COLOR_THRESHOLDS = [
        { min: 60, color: '#ba1b1b' }, // Red for >= 60s
        { min: 30, color: '#e4c313' }, // Orange for >= 30s
        { min: 0, color: '#509f0b' }, // Yellow for >= 10s
        // { min: 0, color: 'transparent' }, // Light yellow for < 10s
    ]

    // Dynamic color function
    const getDurationColor = (duration: number): string => {
        return (
            COLOR_THRESHOLDS.find((threshold) => duration >= threshold.min)
                ?.color || '#f59e0b'
        )
    }

    return (
        <div className={'w-full h-full flex flex-col overflow-y-auto'}>
            <div className={'flex justify-between items-center'}>...</div>
            <div className={' rounded-lg  font-mono'}>
                <svg
                    width={TIMELINE_WIDTH + LABEL_WIDTH * 2}
                    height="800"
                    className={'w-full'}
                >
                    {Object.entries(data).map(([hour, hourDataObj], index) => {
                        const yPosition = OFFSET + index * ROW_SPACING

                        return (
                            <g key={hour} className={''}>
                                {/* Hour label before deltaSegments */}
                                <rect
                                    x={0}
                                    y={yPosition}
                                    width={LABEL_WIDTH}
                                    height={BACKGROUND_HEIGHT}
                                    fill="transparent"
                                    rx="4"
                                />
                                <text
                                    x={LABEL_WIDTH / 2}
                                    y={yPosition + BACKGROUND_HEIGHT / 2 + 4}
                                    textAnchor="middle"
                                    fontSize="16"
                                    fill="#daddec"
                                    fontWeight="bold"
                                >
                                    {hour}:00
                                </text>

                                {/* Background representing the full hour */}
                                <rect
                                    x={LABEL_WIDTH}
                                    width={TIMELINE_WIDTH}
                                    height={BACKGROUND_HEIGHT}
                                    y={yPosition}
                                    fill="transparent"
                                    rx="4"
                                />

                                {/* Render delta segments */}
                                {hourDataObj.deltas.map(
                                    (deltaSegment, deltaIndex) => {
                                        const x =
                                            LABEL_WIDTH +
                                            scaleSecondToPixel(
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
                                                getDurationColor(duration)

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
                                            <g key={deltaIndex}>
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
                                                            opacity="0.5"
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
                                                            opacity="0.5"
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
                                                    y={yPosition + PADDING_Y}
                                                    width={width}
                                                    height={DELTA_HEIGHT}
                                                    fill={
                                                        style.pattern ||
                                                        style.fill
                                                    }
                                                    opacity={style.opacity}
                                                    rx="2"
                                                />

                                                {/* Duration text centered in delta segment */}
                                                {width > 40 && (
                                                    <text
                                                        x={x + width / 2}
                                                        y={
                                                            yPosition +
                                                            PADDING_Y +
                                                            DELTA_HEIGHT / 2 +
                                                            4
                                                        } // Center vertically in delta segment
                                                        textAnchor="middle"
                                                        fontSize="12"
                                                        fill={'#daddec'}
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
                                                            y={
                                                                yPosition +
                                                                BACKGROUND_HEIGHT
                                                            }
                                                            textAnchor="middle"
                                                            fontSize="10"
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
                                    }
                                )}

                                {/* QY label after deltaSegments */}
                                <rect
                                    x={LABEL_WIDTH + TIMELINE_WIDTH}
                                    y={yPosition}
                                    width={LABEL_WIDTH}
                                    height={BACKGROUND_HEIGHT}
                                    fill="transparent"
                                    rx="4"
                                />
                                <text
                                    x={LABEL_WIDTH + TIMELINE_WIDTH + 5}
                                    y={yPosition + BACKGROUND_HEIGHT / 2 + 4}
                                    fontSize="14"
                                    fill="#daddec"
                                    fontWeight="bold"
                                >
                                    {hourDataObj.deltas.length}pz
                                </text>
                            </g>
                        )
                    })}

                    {/* Time markers (every 10 minutes) - adjusted for label offset */}
                    {[0, 10, 20, 30, 40, 50, 60].map((minute) => {
                        const x = LABEL_WIDTH + scaleSecondToPixel(minute * 60)
                        return (
                            <g key={minute}>
                                <line
                                    x1={x}
                                    y1={0} // Start at the top of this hour's rectangle
                                    x2={x}
                                    y2={300 + 60} // End at the bottom of this hour's rectangle
                                    stroke="#6b7280"
                                    strokeWidth="1"
                                    strokeDasharray="2,2"
                                />
                            </g>
                        )
                    })}
                    {[0, 10, 20, 30, 40, 50, 60].map((minute) => {
                        const x = LABEL_WIDTH + scaleSecondToPixel(minute * 60)
                        return (
                            <g key={minute}>
                                <text
                                    x={x + 14}
                                    y={OFFSET - 4} // Position text above this hour's rectangle
                                    textAnchor="middle"
                                    fontSize="12"
                                    fill={'#acb3cf'}
                                    fontWeight="bold"
                                >
                                    :{minute.toString().padStart(2, '0')}
                                </text>
                            </g>
                        )
                    })}
                </svg>
            </div>
        </div>
    )
}

export default DeltasByHourChart
