import React, { useState } from 'react'
import WorkPlanPane from '@/src/components/info/work_plan/WorkPlanPane'
import BarChartHbh from '@/src/components/charts/BarChartHBH'
import ProductionLineMetrics from '@/src/components/info/ProductionLineMetrics'
import { Button } from '@/components/ui/button'
import {
    ChartBarIcon,
    ChartNoAxesColumn,
    ClipboardIcon,
    SquareKanbanIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import BarChartDeltasByStation from '@/src/components/charts/BarChartDeltasByStation'

function LineMetricsOverPane() {
    const [chartView, setChartView] = useState('hbh')
    return (
        <div className={'flex flex-row h-full w-full  gap-2'}>
            <div className={'w-[270px] h-full p-2'}>
                <ProductionLineMetrics />
            </div>
            <div className={'h-full w-full  flex flex-col '}>
                <div className={'flex flex-row justify-between '}>
                    <WorkPlanPane
                        variant={'header'}
                        platform={'LUXOR GGS M'}
                        commit={2134}
                        sku={'JFFDS'}
                        uph={321}
                    />

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
                    <BarChartHbh />
                ) : (
                    <BarChartDeltasByStation />
                )}
            </div>
        </div>
    )
}
export default LineMetricsOverPane
