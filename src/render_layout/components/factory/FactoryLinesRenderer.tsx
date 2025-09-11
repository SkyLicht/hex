import React from 'react'
import { LineRenderer } from '@/src/render_layout/type/line-render'
import FactoryMachinesRenderer from '@/src/render_layout/components/factory/FactoryMachinesRenderer'
import { FactoryDataCollectorsRender } from '@/src/render_layout/components/factory/FactoryDataCollectorsRender'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'

interface Props {
    lines: LineRenderer[]
    hourly_data: { [key: string]: number }
    last_record: { [key: string]: string }
    onDataCollectorSelected: (dataCollector: DataCollectorRenderer) => void
}

export const FactoryLinesRenderer = ({
    lines,
    hourly_data,
    last_record,
    onDataCollectorSelected,
}: Props) => {
    // const _last_record_time = mapLatestRecordToTimeDifference(last_record)

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
                            stroke={'#fff'}
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
                            Line {line.label}
                        </text>

                        <FactoryMachinesRenderer machines={line.machines} />

                        <FactoryDataCollectorsRender
                            dataCollectors={line.data_collectors}
                            hourly_data={hourly_data}
                            last_record_time={getMinutesSince(last_record)}
                            onDataCollectorSelected={onDataCollectorSelected}
                        />
                    </g>
                )
            })}
        </g>
    )
}

function getMinutesSince(timestampObj: { [key: string]: string }): {
    [key: string]: number
} {
    const result: { [key: string]: number } = {}

    for (const key in timestampObj) {
        const inputDate = new Date(timestampObj[key])
        const now = new Date()
        const diffMs = now.getTime() - inputDate.getTime()
        result[key] = Math.floor(diffMs / (1000 * 60))
    }

    return result
}
