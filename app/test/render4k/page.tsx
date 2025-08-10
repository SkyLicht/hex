'use client'
import React from 'react'
import FactoryRenderer from '@/src/render_layout/components/factory/FactoryRenderer'
import { fileToFactoryRender } from '@/src/render_layout/mappers/file-to-factory-render'
import render_layout from '@/public/render/render_layout.json'
import { useWebSocketDataCollectorV2 } from '@/src/hooks/use-data-collecotr-socket-v2'

const FactoryRender4k = () => {
    const {
        hourlySummary,
        wipSummary,
        latestRecordSummary,
        connectionStatus,
        error,
        reconnect,
    } = useWebSocketDataCollectorV2('ws://10.13.33.131:8051/ws/monitor', {
        onHourlySummary: (data) => {
            console.log('Hourly summary updated:', data)
            // Handle hourly summary data
        },
        onWipSummary: (data) => {
            console.log('WIP summary updated:', data)
            // Handle WIP summary data
        },
        onLatestRecordSummary: (data) => {
            console.log('Latest records updated:', data)
            // Handle latest record data
        },
    })

    return (
        <div className={'max-w-screen w-full h-full border-black border-2 p-4'}>
            {/*<AnimatedGraph/>*/}

            <FactoryRenderer
                factory={fileToFactoryRender(render_layout)}
                resolution={2160}
                hourly={hourlySummary}
                last_record={latestRecordSummary}
            />
        </div>
    )
}

export default FactoryRender4k
