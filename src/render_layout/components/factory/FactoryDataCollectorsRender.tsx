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
                            stroke="#b5becd"
                            strokeWidth="2"
                            strokeDasharray="2,3"
                            markerEnd="url(#arrowhead)"
                        />
                        <rect
                            key={`data_collector-render-rect-${dataCollector.id}`}
                            x={dataCollector.linked_line.pointA.x - 2.5}
                            y={dataCollector.linked_line.pointA.y - 5}
                            width={5}
                            height={10}
                            fill={'#b5becd'}
                        ></rect>
                        <rect
                            key={`data_collector-render-rect-2-${dataCollector.id}`}
                            x={dataCollector.dimensions.x}
                            y={dataCollector.dimensions.y}
                            width={dataCollector.dimensions.width}
                            height={dataCollector.dimensions.height}
                            fill={'#b5becd'}
                            stroke={'#82a7c1'}
                        ></rect>

                        {/*<RenderContainerAnchors*/}
                        {/*    anchors={dataCollector.dimensions.anchors}*/}
                        {/*/>*/}
                    </g>
                )
            })}
        </g>
    )
}
