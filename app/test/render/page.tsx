'use client'
import React, { useMemo, useState } from 'react'
import { FactoryRenderer } from '@/src/render_layout/components/factory/FactoryRenderer'
import { fileToFactoryRender } from '@/src/render_layout/mappers/file-to-factory-render'
import render_layout from '@/public/render/render_layout.json'
import { useWebSocketDataCollectorV2 } from '@/src/hooks/use-data-collecotr-socket-v2'
import LineSelector from '@/src/render_layout/components/widgets/LineSelector'
import LineMetricsOverPane from '@/src/components/widgets/line_metrics/LineMetricsOverPane'
import { useSearchParams } from 'next/navigation'
import { useWorkPlan } from '@/src/hooks/use_work_plan'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'
import DataCollectorTabs from '@/src/components/widgets/line_metrics/DataCollectorTabs'
import DataCollectorHeldPCB from '@/src/components/widgets/line_metrics/DataCollectorHeldPCB'
import { Button } from '@/components/ui/button'

const ManagerPage = () => {
    const {
        hourlySummary,
        wipSummary,
        latestRecordSummary,
        connectionStatus,
        error,
        reconnect,
    } = useWebSocketDataCollectorV2('ws://10.13.33.131:8051/ws/monitor', {
        onHourlySummary: (data) => {
            // console.log('Hourly summary updated:', data)
        },
        onWipSummary: (data) => {
            // console.log('WIP summary updated:', data)
        },
        onLatestRecordSummary: (data) => {
            // console.log('Latest records updated:', data)
        },
    })

    const [selectedCollector, setSelectedCollector] = React.useState<
        DataCollectorRenderer | undefined
    >(undefined)

    const [isPane, setIsPane] = useState(false)

    const { data, isLoading, isError } = useWorkPlan()

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
                wip={wipSummary}
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

            <section className="absolute top-0 left-0 w-fit h-[50px] text-white text-center flex items-center justify-between pl-4 bg-blue-600">
                <Button
                    onClick={() => {
                        setIsPane(!isPane)
                    }}
                >
                    d
                </Button>
            </section>

            <section className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1300px] h-[250px] text-white flex items-center justify-center pb-4">
                <section className="w-full h-full flex flex-col backdrop-blur-md bg-neutral-500/10 border border-neutral-400/20 rounded-xl px-2 pt-1">
                    {data && (
                        <LineMetricsOverPane
                            selectedLine={selected_line || 'none'}
                            workPlan={data.find(
                                (p) => p.line.name === selected_line
                            )}
                            hourlySummary={hourlySummary}
                        />
                    )}
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
                <section className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1500px] h-full text-white flex items-center justify-center py-4">
                    <section className="w-full h-full flex flex-col backdrop-blur-md bg-neutral-500/10 border border-neutral-400/20 rounded-xl px-2 pt-1">
                        {selected_line && (
                            <div className={'w-full h-full flex'}>
                                <DataCollectorHeldPCB
                                    dataCollector={''}
                                    lineName={selected_line}
                                    groupName={''}
                                />
                            </div>
                        )}
                    </section>
                </section>
            )}
        </div>
    )
}

export default ManagerPage
