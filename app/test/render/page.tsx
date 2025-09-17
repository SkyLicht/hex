'use client'
import React, { useMemo, useState } from 'react'
import { FactoryRenderer } from '@/src/render_layout/components/factory/FactoryRenderer'
import { fileToFactoryRender } from '@/src/render_layout/mappers/file-to-factory-render'
import render_layout from '@/public/render/render_layout.json'
import LineSelector from '@/src/render_layout/components/widgets/LineSelector'
import LineMetricsOverPane from '@/src/components/widgets/line_metrics/LineMetricsOverPane'
import { useSearchParams } from 'next/navigation'
import { useGetLastUPH } from '@/src/hooks/use_uph_record'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'
import DataCollectorTabs from '@/src/components/widgets/line_metrics/DataCollectorTabs'
import { Button } from '@/components/ui/button'
import HistoricalDataContainer from '@/src/components/widgets/historical_data/HistoricalDataContainer'
import { CalendarIcon } from 'lucide-react'
import { useSocket } from '@/src/hooks/use-socket'

const ManagerPage = () => {
    const {
        hourlySummary,
        latestRecordSummary,
        connectionStatus,
        error,
        reconnect,
    } = useSocket('ws://10.13.32.222:9091/ws/monitor', {
        onConnect: () => {
            console.log('Connected')
        },
        onDisconnect: () => {
            console.log('Disconnected')
        },
        onMessage: (message) => {
            console.log('Message received:', message)
        },
    })

    const [selectedCollector, setSelectedCollector] = React.useState<
        DataCollectorRenderer | undefined
    >(undefined)

    const [isPane, setIsPane] = useState(false)

    const searchParams = useSearchParams()
    const selected_line = searchParams.get('selected_line')

    // Memoize the factory so its identity stays stable across renders
    const factory = useMemo(() => fileToFactoryRender(render_layout), [])

    return (
        <div className="!min-w-[1024px] w-full h-full border-black border-2 relative">
            <FactoryRenderer
                factory={factory}
                resolution={1536}
                hourly={hourlySummary}
                last_record={latestRecordSummary}
                onDataCollectorSelected={(dataCollector) => {
                    if (selectedCollector === dataCollector) {
                        setSelectedCollector(undefined)
                        return
                    }

                    if (selectedCollector) {
                        setSelectedCollector(undefined)
                        return
                    }
                    setSelectedCollector(dataCollector)
                }}
            />

            <section className="absolute top-0 right-0 w-fit h-[50px] text-white text-center flex items-center justify-between pr-4">
                <LineSelector />
            </section>

            <section className="absolute top-0 left-0 w-fit h-[50px] text-white text-center flex items-center justify-between pl-4">
                <Button
                    onClick={() => {
                        setIsPane(!isPane)
                    }}
                >
                    <CalendarIcon />
                </Button>
            </section>

            <section className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1300px] h-[250px] text-white flex items-center justify-center pb-4">
                <section className="w-full h-full flex flex-col backdrop-blur-md bg-neutral-500/10 border border-neutral-400/20 rounded-xl px-2 pt-1 select-none">
                    <HourByHourContainer
                        selected_line={selected_line || 'none'}
                    />
                </section>
            </section>

            {selectedCollector && (
                <section className="absolute z-50 top-0 left-1/2 transform  -translate-x-1/2 w-[1300px] min-h-[250px] h-[calc(100vh-270px)] text-white flex items-center justify-center pt-4 ">
                    <section className="w-full h-full flex flex-col backdrop-blur-sm bg-neutral-500/10 border border-neutral-400/20 rounded-xl p-2 font-sans ">
                        <div
                            className={
                                'w-full h-full flex flex-col text-stone-300  font-semibold '
                            }
                        >
                            <DataCollectorTabs
                                dataCollector={selectedCollector.collector_id}
                                lineName={''}
                                groupName={''}
                                onClose={() => setSelectedCollector(undefined)}
                            />
                        </div>
                    </section>
                </section>
            )}

            {isPane && (
                <section
                    className={
                        'w-full h-full bg-black/10 absolute top-0 left-0 z-50'
                    }
                >
                    <section className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1500px] h-full text-white flex items-center justify-center py-4 bg-transparent">
                        <section className="w-full h-full flex flex-col backdrop-blur-md bg-neutral-500/10 border border-neutral-400/20 rounded-xl px-2 pt-1">
                            <HistoricalDataContainer
                                onClose={() => setIsPane(false)}
                            />

                            {/*<DataCollectorHeldPCB lineName={'J01'} />*/}
                        </section>
                    </section>
                </section>
            )}
        </div>
    )
}

const HourByHourContainer = ({ selected_line }: { selected_line: string }) => {
    const { data, isLoading, isError, error } = useGetLastUPH()

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>{error.message}</p>
    if (!data) return <p>No data available</p>
    return (
        <LineMetricsOverPane
            selectedLine={selected_line || 'none'}
            uph={data.find((p) => p.line.name === selected_line)}
        />
    )
}

export default ManagerPage
// <div className={'w-full h-full flex'}>
//     <DataCollectorHeldPCB
// dataCollector={''}
// lineName={selected_line}
// groupName={''}
// />
// </div>
