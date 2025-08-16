import React from 'react'
import { LineRenderer } from '@/src/render_layout/type/line-render'
import FactoryMachinesRenderer from '@/src/render_layout/components/factory/FactoryMachinesRenderer'
import { FactoryDataCollectorsRender } from '@/src/render_layout/components/factory/FactoryDataCollectorsRender'
import {
    LatestRecordSummaryData,
    WipSummaryData,
} from '@/src/hooks/use-data-collecotr-socket-v2'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'

interface Props {
    lines: LineRenderer[]
    hourly_data: { [key: string]: number }
    wip: WipSummaryData
    last_record: LatestRecordSummaryData
    onDataCollectorSelected: (dataCollector: DataCollectorRenderer) => void
}

export const FactoryLinesRenderer = ({
    lines,
    hourly_data,
    wip,
    last_record,
    onDataCollectorSelected,
}: Props) => {
    const _last_record_time = mapLatestRecordToTimeDifference(last_record)

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
                            wip={wip}
                            last_record_time={_last_record_time}
                            onDataCollectorSelected={onDataCollectorSelected}
                        />
                    </g>
                )
            })}
        </g>
    )
}

export const mapLatestRecordToTimeDifference = (
    latestRecordData: LatestRecordSummaryData
): { [key: string]: number } => {
    const result: { [key: string]: number } = {}
    const now = new Date() // Current local time

    Object.entries(latestRecordData).forEach(([key, recordData]) => {
        if (recordData?.collected_timestamp) {
            try {
                // Remove 'Z' if present and treat as local time
                const cleanTimestamp = recordData.collected_timestamp.replace(
                    'Z',
                    ''
                )

                // Parse as local time (JavaScript will interpret this in local timezone)
                const collectedTime = new Date(cleanTimestamp)

                // Validate the date
                if (isNaN(collectedTime.getTime())) {
                    throw new Error('Invalid date')
                }

                // Calculate difference in seconds (both times are now in local timezone)
                const diffInSeconds = Math.floor(
                    (now.getTime() - collectedTime.getTime()) / 1000
                )
                result[key] = Math.floor(diffInSeconds / 60) // Ensure non-negative values
            } catch (error) {
                console.warn(
                    `Invalid timestamp for ${key}:`,
                    recordData.collected_timestamp,
                    error
                )
                result[key] = 0
            }
        } else {
            result[key] = 0
        }
    })

    return result
}
