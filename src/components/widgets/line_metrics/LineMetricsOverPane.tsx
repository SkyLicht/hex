'use client'
import React, { useMemo, useState } from 'react'
import WorkPlanPane from '@/src/components/info/work_plan/WorkPlanPane'
import HourByHourBarChart from '@/src/components/charts/HourByHourBarChart'
import ProductionLineMetrics from '@/src/components/info/ProductionLineMetrics'
import { Button } from '@/components/ui/button'
import { ChartNoAxesColumn, ClipboardIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import BarChartDeltasByStation from '@/src/components/charts/BarChartDeltasByStation'
import { useGetCurrentDayHBH } from '@/src/hooks/use_hbb_api'
import HandleInfoPane from '@/src/handlers/handle_info_pane'
import { UphRecordDTO } from '@/src/dto/planner_dto'

interface Props {
    selectedLine: string
    uph?: UphRecordDTO
}
// export function sumHourlySummary(hourlySummary: {
//     [key: string]: number
// }): number {
//     return Object.values(hourlySummary).reduce((acc, v) => {
//         return acc + (typeof v === 'number' && Number.isFinite(v) ? v : 0)
//     }, 0)
// }

function LineMetricsOverPane({ selectedLine, uph }: Props) {
    const { isError, data, isLoading } = useGetCurrentDayHBH()

    const hbh = useMemo(() => {
        const _h = new HandleInfoPane(selectedLine, data, uph)
        return _h.generateInfoPane()
    }, [data, selectedLine, uph])

    const [chartView, setChartView] = useState('hbh')

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    // if (isError || !data) {
    //     return <div>Error loading data</div>
    // }

    return (
        <div className={'flex flex-row h-full w-full  gap-2'}>
            <div className={'w-[270px] h-full p-2'}>
                <ProductionLineMetrics
                    current={hbh.current}
                    actual={hbh.actual}
                    oee={hbh.oee}
                    fpy={hbh.fpy}
                />
            </div>
            <div className={'h-full w-full  flex flex-col '}>
                <div className={'flex flex-row justify-between '}>
                    {uph ? (
                        <WorkPlanPane
                            variant={'header'}
                            line={selectedLine}
                            platform={uph.platform.platform}
                            commit={hbh.commit}
                            sku={uph.platform.sku}
                            uph={uph.uph}
                        />
                    ) : (
                        <div>Not </div>
                    )}

                    <div className={'flex flex-row gap-2'}>
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            onClick={() => {
                                setChartView('deltas')
                            }}
                            className={cn(
                                'cursor-pointer hover:bg-stone-700 ',
                                chartView === 'hbh'
                                    ? 'text-stone-300'
                                    : ' text-blue-500'
                            )}
                        >
                            <ClipboardIcon />
                        </Button>
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            onClick={() => {
                                setChartView('hbh')
                            }}
                            className={cn(
                                'cursor-pointer hover:bg-stone-700 ',
                                chartView === 'deltas'
                                    ? 'text-stone-300 '
                                    : ' text-blue-500'
                            )}
                        >
                            <ChartNoAxesColumn />
                        </Button>
                    </div>
                </div>

                {chartView === 'hbh' ? (
                    <HourByHourBarChart
                        chartData={hbh.chart_data}
                        uph={hbh.uph}
                    />
                ) : (
                    <BarChartDeltasByStation />
                )}
            </div>
        </div>
    )
}
export default LineMetricsOverPane
