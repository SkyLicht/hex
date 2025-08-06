import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'
import React from 'react'
interface Props {
    dataCollectors: DataCollectorRenderer[]
}
export const FactoryDataCollectorsRender = ({ dataCollectors }: Props) => {
    return (
        <g>
            {dataCollectors.map((dataCollector) => {
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

                        <rect
                            key={`data_collector-render-rect-2-${dataCollector.id}`}
                            x={dataCollector.dimensions.x}
                            y={dataCollector.dimensions.y}
                            width={dataCollector.dimensions.width}
                            height={dataCollector.dimensions.height}
                            fill={'#2d2d2d'}
                            stroke={'#1d1d1d'}
                            rx={6}
                        ></rect>
                        <text
                            x={dataCollector.dimensions.x + 5}
                            y={dataCollector.dimensions.y + 20}
                            textAnchor="start"
                            fontSize={16}
                            fontWeight="bold"
                            fill={'#A6A6A6'}
                            style={{
                                dominantBaseline: 'middle',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                        >
                            100
                        </text>

                        <text
                            x={dataCollector.dimensions.x + 5}
                            y={dataCollector.dimensions.y + 40}
                            textAnchor="start"
                            fontSize={12}
                            fontWeight="bold"
                            fill={'#A6A6A6'}
                            style={{
                                dominantBaseline: 'middle',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                        >
                            100%
                        </text>

                        <text
                            x={dataCollector.dimensions.x + 50}
                            y={dataCollector.dimensions.y + 30}
                            textAnchor="start"
                            fontSize={16}
                            fontWeight="bold"
                            fill={'#DC2626'}
                            style={{
                                dominantBaseline: 'middle',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                        >
                            36
                        </text>

                        <g
                            transform={`translate(${dataCollector.dimensions.x + 60}, ${dataCollector.dimensions.y - 10}) scale(1)`}
                        >
                            <path
                                d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3
             -1.072-2.143-.224-4.054 2-6
             .5 2.5 2 4.9 4 6.5
             2 1.6 3 3.5 3 5.5
             a7 7 0 1 1-14 0
             c0-1.153.433-2.294 1-3
             a2.5 2.5 0 0 0 2.5 2.5z"
                                fill="none"
                                stroke="#DC2626"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>

                        {/*<RenderContainerAnchors*/}
                        {/*    anchors={dataCollector.dimensions.anchors}*/}
                        {/*/>*/}
                    </g>
                )
            })}
        </g>
    )
}
