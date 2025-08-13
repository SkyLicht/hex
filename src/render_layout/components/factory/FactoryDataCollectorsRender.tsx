import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'
import React, { useState } from 'react'

interface Props {
    dataCollectors: DataCollectorRenderer[]
    hourly_data: { [key: string]: number }
    last_record_time: { [key: string]: number }
    onDataCollectorSelected: (dataCollector: DataCollectorRenderer) => void
}

export const FactoryDataCollectorsRender = ({
    dataCollectors,
    hourly_data,
    last_record_time,
    onDataCollectorSelected,
}: Props) => {
    const [hoveredCollector, setHoveredCollector] = useState<string | null>(
        null
    )

    const handleCollectorClick = (dataCollector: DataCollectorRenderer) => {
        onDataCollectorSelected(dataCollector)
    }

    return (
        <g>
            {dataCollectors.map((dataCollector) => {
                const _last_record_time = last_record_time.hasOwnProperty(
                    dataCollector.collector_id
                )
                    ? last_record_time[dataCollector.collector_id]
                    : 0

                const isHovered = hoveredCollector === dataCollector.id

                return (
                    <g key={dataCollector.id}>
                        <line
                            x1={dataCollector.linked_line.pointA.x}
                            y1={dataCollector.linked_line.pointA.y}
                            x2={dataCollector.linked_line.pointB.x}
                            y2={dataCollector.linked_line.pointB.y}
                            stroke="#A6A6A6"
                            strokeWidth="2"
                            strokeDasharray="2,3"
                            markerEnd="url(#arrowhead)"
                        />

                        {/* Invisible clickable area that covers the entire data collector */}
                        <rect
                            x={dataCollector.dimensions.x - 5}
                            y={dataCollector.dimensions.y - 15}
                            width={dataCollector.dimensions.width + 10}
                            height={dataCollector.dimensions.height + 20}
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleCollectorClick(dataCollector)}
                            onMouseEnter={() =>
                                setHoveredCollector(dataCollector.id)
                            }
                            onMouseLeave={() => setHoveredCollector(null)}
                        />

                        <g
                            key={`data_collector-render-rect-1-${dataCollector.id}`}
                            transform={`translate(${dataCollector.dimensions.x}, ${dataCollector.dimensions.y})`}
                            style={{
                                cursor: 'pointer',
                                pointerEvents: 'none', // Prevent this group from intercepting clicks
                            }}
                        >
                            <rect
                                key={`data_collector-render-rect-2-${dataCollector.id}`}
                                width={dataCollector.dimensions.width}
                                height={dataCollector.dimensions.height}
                                fill={isHovered ? '#4a4a4a' : '#2d2d2d'}
                                stroke={'#1d1d1d'}
                                strokeWidth={isHovered ? 2 : 1}
                                rx={6}
                                style={{
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            />

                            <text
                                textAnchor="start"
                                fontSize={12}
                                y={-7}
                                x={5}
                                fontWeight="bold"
                                fill={isHovered ? '#ffffff' : '#A6A6A6'}
                                style={{
                                    dominantBaseline: 'middle',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                    transition: 'fill 0.2s ease-in-out',
                                }}
                            >
                                {dataCollector.label}
                            </text>

                            {/*<text*/}
                            {/*    textAnchor="start"*/}
                            {/*    fontSize={10}*/}
                            {/*    x={52}*/}
                            {/*    y={10}*/}
                            {/*    fontWeight="bold"*/}
                            {/*    fill={isHovered ? '#ffffff' : '#A6A6A6'}*/}
                            {/*    style={{*/}
                            {/*        dominantBaseline: 'middle',*/}
                            {/*        userSelect: 'none',*/}
                            {/*        pointerEvents: 'none',*/}
                            {/*        transition: 'fill 0.2s ease-in-out',*/}
                            {/*    }}*/}
                            {/*/>*/}

                            <text
                                x={20}
                                y={14}
                                textAnchor="start"
                                fontSize={18}
                                fontWeight="bold"
                                fill={isHovered ? '#ffffff' : '#A6A6A6'}
                                style={{
                                    dominantBaseline: 'middle',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                    transition: 'fill 0.2s ease-in-out',
                                }}
                            >
                                {hourly_data.hasOwnProperty(
                                    dataCollector.collector_id
                                )
                                    ? hourly_data[dataCollector.collector_id]
                                    : 0}
                            </text>

                            <g
                                transform={`translate(${4}, ${0}) scale(1)`}
                                style={{ pointerEvents: 'none' }}
                            >
                                <path
                                    d="m2 6 5 5 5-5"
                                    fill="none"
                                    stroke={isHovered ? '#ff4444' : '#c61919'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        transition: 'stroke 0.2s ease-in-out',
                                    }}
                                />
                                <path
                                    d="m2 13 5 5 5-5"
                                    fill="none"
                                    stroke={isHovered ? '#ff4444' : '#c61919'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        transition: 'stroke 0.2s ease-in-out',
                                    }}
                                />
                            </g>

                            {_last_record_time > 1 ? (
                                <>
                                    <text
                                        x={40}
                                        y={30}
                                        textAnchor="start"
                                        fontSize={16}
                                        fontWeight="bold"
                                        fill={isHovered ? '#ff4444' : '#c61919'}
                                        style={{
                                            dominantBaseline: 'middle',
                                            userSelect: 'none',
                                            pointerEvents: 'none',
                                            transition: 'fill 0.2s ease-in-out',
                                        }}
                                    >
                                        {_last_record_time}
                                    </text>

                                    <g
                                        transform={`translate(${55}, ${14}) scale(1)`}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        <path
                                            d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 -1.072-2.143-.224-4.054 2-6  .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5 a7 7 0 1 1-14 0 c0-1.153.433-2.294 1-3 a2.5 2.5 0 0 0 2.5 2.5z"
                                            fill="none"
                                            stroke={
                                                isHovered
                                                    ? '#ff4444'
                                                    : '#DC2626'
                                            }
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{
                                                transition:
                                                    'stroke 0.2s ease-in-out',
                                            }}
                                        />
                                    </g>
                                </>
                            ) : null}
                        </g>
                    </g>
                )
            })}
        </g>
    )
}
