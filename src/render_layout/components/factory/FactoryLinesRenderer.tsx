import React from 'react'
import { LineRenderer } from '@/src/render_layout/type/line-render'
import FactoryMachinesRenderer from '@/src/render_layout/components/factory/FactoryMachinesRenderer'
import { FactoryDataCollectorsRender } from '@/src/render_layout/components/factory/FactoryDataCollectorsRender'

interface Props {
    lines: LineRenderer[]
}

export const FactoryLinesRenderer = ({ lines }: Props) => {
    return (
        <g key={'692f3e74-e86e-46d5-a745-dc333ce28215'}>
            {lines.map((line) => {
                return (
                    <g key={`factory-line-render-${line.id}`}>
                        <rect
                            key={`factory-line-render-rect-${line.id}`}
                            x={line.dimensions.x}
                            y={line.dimensions.y}
                            width={line.dimensions.width}
                            height={line.dimensions.height}
                            fill={'#1E1F22'}
                            stroke={'#212123'}
                            strokeWidth={0}
                            rx={25}
                        ></rect>

                        <text
                            x={line.dimensions.x + 15}
                            y={line.dimensions.y + 25}
                            textAnchor="start"
                            fontSize={24}
                            fontWeight="bold"
                            fill={'#A6A6A6'}
                            style={{
                                dominantBaseline: 'middle',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                        >
                            {line.label}
                        </text>

                        <FactoryMachinesRenderer machines={line.machines} />

                        <FactoryDataCollectorsRender
                            dataCollectors={line.data_collectors}
                        />
                    </g>
                )
            })}
        </g>
    )
}
