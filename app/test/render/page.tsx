'use client'
import React, { useMemo } from 'react'
import { FactoryRenderer } from '@/src/render_layout/components/factory/FactoryRenderer'
import { fileToFactoryRender } from '@/src/render_layout/mappers/file-to-factory-render'
import render_layout from '@/public/render/render_layout.json'
import { useWebSocketDataCollectorV2 } from '@/src/hooks/use-data-collecotr-socket-v2'
import AnimatedGraph from '@/src/render_layout/components/graphs/AnimatedGraph'
import LineSelector from '@/src/render_layout/components/widgets/LineSelector'
import LineMetricsOverPane from '@/src/components/widgets/line_metrics/LineMetricsOverPane'
import { XIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useWorkPlan } from '@/src/hooks/use_work_plan'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'
import DataCollectorDeltas from '@/src/components/widgets/line_metrics/DataCollectorDeltas'

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
                sakldhy
            </section>

            <section className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[250px] text-white flex items-center justify-center pb-4">
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

                    {/*<p>*/}
                    {/*    {connectionStatus === 'connected'*/}
                    {/*        ? 'Connected'*/}
                    {/*        : 'Disconnected'}*/}
                    {/*</p>*/}
                    {/*<div className="w-full h-full flex items-center ">*/}
                    {/*    <AnimatedGraph />*/}
                    {/*    <svg className="w-full h-auto">*/}
                    {/*        <g className="">*/}
                    {/*            <defs>*/}
                    {/*                <linearGradient*/}
                    {/*                    id="wk_smt_electric_blue"*/}
                    {/*                    x1="0"*/}
                    {/*                    y1="0"*/}
                    {/*                    x2="0"*/}
                    {/*                    y2="1"*/}
                    {/*                >*/}
                    {/*                    <stop*/}
                    {/*                        offset="10%"*/}
                    {/*                        stopColor={'#0284c7'}*/}
                    {/*                        stopOpacity={0.8}*/}
                    {/*                    />*/}
                    {/*                    <stop*/}
                    {/*                        offset="90%"*/}
                    {/*                        stopColor={'#1e40af'}*/}
                    {/*                        stopOpacity={1}*/}
                    {/*                    />*/}
                    {/*                </linearGradient>*/}
                    {/*            </defs>*/}

                    {/*            <defs>*/}
                    {/*                <linearGradient*/}
                    {/*                    id="wk_smt_in_green"*/}
                    {/*                    x1="0"*/}
                    {/*                    y1="0"*/}
                    {/*                    x2="0"*/}
                    {/*                    y2="1"*/}
                    {/*                >*/}
                    {/*                    <stop*/}
                    {/*                        offset="10%"*/}
                    {/*                        stopColor={'#84cc16'}*/}
                    {/*                        stopOpacity={0.8}*/}
                    {/*                    />*/}
                    {/*                    <stop*/}
                    {/*                        offset="90%"*/}
                    {/*                        stopColor={'#3f6212'}*/}
                    {/*                        stopOpacity={1}*/}
                    {/*                    />*/}
                    {/*                </linearGradient>*/}
                    {/*            </defs>*/}

                    {/*            <defs>*/}
                    {/*                <linearGradient*/}
                    {/*                    id="wk_smt_in_red"*/}
                    {/*                    x1="0"*/}
                    {/*                    y1="0"*/}
                    {/*                    x2="0"*/}
                    {/*                    y2="1"*/}
                    {/*                >*/}
                    {/*                    <stop*/}
                    {/*                        offset="10%"*/}
                    {/*                        stopColor={'#dc2626'}*/}
                    {/*                        stopOpacity={0.8}*/}
                    {/*                    />*/}
                    {/*                    <stop*/}
                    {/*                        offset="90%"*/}
                    {/*                        stopColor={'#7f1d1d'}*/}
                    {/*                        stopOpacity={1}*/}
                    {/*                    />*/}
                    {/*                </linearGradient>*/}
                    {/*            </defs>*/}
                    {/*            <rect*/}
                    {/*                width={20}*/}
                    {/*                height={100}*/}
                    {/*                x={30}*/}
                    {/*                fill="url(#wk_smt_in_green)"*/}
                    {/*                rx={10}*/}
                    {/*            ></rect>*/}
                    {/*            <rect*/}
                    {/*                width={20}*/}
                    {/*                height={100}*/}
                    {/*                x={60}*/}
                    {/*                fill="url(#wk_smt_in_red)"*/}
                    {/*                rx={10}*/}
                    {/*            ></rect>*/}
                    {/*            <rect*/}
                    {/*                width={20}*/}
                    {/*                height={100}*/}
                    {/*                fill="url(#wk_smt_electric_blue)"*/}
                    {/*                rx={10}*/}
                    {/*            ></rect>*/}
                    {/*        </g>*/}
                    {/*    </svg>*/}
                    {/*</div>*/}

                    {/*<div*/}
                    {/*    className={*/}
                    {/*        ' w-fit px-2 flex flex-row gap-2 text-lg font-semibold text-stone-300'*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    <h2>Luxor MG ee</h2>*/}
                    {/*    <p>YGHGSD</p>*/}

                    {/*    <p>UPH: 231</p>*/}

                    {/*    <p>Commit: 4000</p>*/}
                    {/*</div>*/}

                    {/*<div*/}
                    {/*    className={*/}
                    {/*        ' w-fit px-2 flex flex-row gap-2 font-semibold text-neutral-300'*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    <h3 className={'text-6xl text-stone-400'}>36</h3>*/}
                    {/*</div>*/}
                </section>
            </section>

            {selectedCollector && (
                <section className="absolute z-50 top-0 left-1/2 transform  -translate-x-1/2 w-[1500px] min-h-[250px] h-[calc(100vh-270px)] text-white flex items-center justify-center pt-4 ">
                    <section className="w-full h-full flex flex-col backdrop-blur-sm bg-neutral-500/10 border border-neutral-400/20 rounded-xl p-2 font-sans ">
                        <div
                            className={
                                'flex flex-col gap-2 text-stone-300  font-semibold '
                            }
                        >
                            <div className={'flex flex-row justify-between'}>
                                <h3 className={'text-stone-300'}>
                                    {selectedCollector.label}
                                </h3>
                                <XIcon
                                    className={'w-6 h-6 cursor-pointer'}
                                    onClick={() =>
                                        setSelectedCollector(undefined)
                                    }
                                />
                            </div>
                        </div>
                        <DataCollectorDeltas
                            dataCollector={selectedCollector.collector_id}
                        />
                    </section>
                </section>
            )}
        </div>
    )
}

export default ManagerPage
