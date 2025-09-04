import React from 'react'
import {
    HistoricRecord,
    HistoricStationGroupByStation,
    HistoricStationHourSummary,
} from '@/src/components/widgets/historical_data/historic_types'
import { ProcessUnitsToDeltas } from '@/src/handlers/handle_deltas'
import DeltaHourChart from '@/src/components/charts/DeltaHourChart'
import HourByHourBarChart from '@/src/components/charts/HourByHourBarChart'
import { useGetWIPByHour } from '@/src/hooks/use_wip'
import WipDetailsModal from '@/src/components/widgets/historical_data/data_collector_details/WipDetailsModal'
import { UnitItem } from '@/src/types/hex_api'

interface Props {
    id: string
    data: HistoricStationHourSummary
    hour_by_hour: HistoricStationGroupByStation[]
    date: string
    line: string
    group_a: string
    group_b: string
    selected_hour: number
}
const DataCollectorDetailsContainer = ({
    id,
    data,
    hour_by_hour,
    date,
    selected_hour,
    line,
    group_a,
    group_b,
}: Props) => {
    const [isWipOpen, setIsWipOpen] = React.useState(false)
    const [selectedUnits, setSelectedUnits] = React.useState<UnitItem[]>([])
    return (
        <>
            <div className={'w-full h-[420px] flex flex-col p-4 font-sans '}>
                <DataCollectorsDetailsDeltas units={data.records} />
                <div className={"'w-full h-full flex flex-row "}>
                    <div className={'w-1/5 h-full flex flex-col gap-3 '}>
                        <div className={'w-full h-full grid grid-cols-2 gap-1'}>
                            <DataCollectorDetails
                                label={'UNITS'}
                                num1={data.units_pass}
                            />
                            <DataCollectorDetails
                                label={'FAIL UNITS'}
                                num1={data.units_fail}
                            />
                            <DataCollectorWIP
                                date={date}
                                hour={selected_hour}
                                line={line}
                                group_a={group_a}
                                group_b={group_b}
                                onSelected={(units) => {
                                    setSelectedUnits(units)
                                    setIsWipOpen(true)
                                }}
                            />
                            <DataCollectorDetails label={'DOWNTIME'} num1={0} />
                        </div>
                        <div
                            className={
                                'w-full h-[140px] flex flex-col font-sans '
                            }
                        >
                            <div
                                className={
                                    'w-full h-fit grid grid-cols-2 gap-2 '
                                }
                            >
                                <Pill className="bg-sky-800/50 text-sky-200 border   border-sky-600/50">
                                    Threshold {12}
                                </Pill>
                                <Pill className="bg-sky-800/50 text-sky-200 border   border-sky-600/50">
                                    Threshold {12}
                                </Pill>
                                <Pill className="bg-sky-800/50 text-sky-200 border   border-sky-600/50">
                                    Threshold {12}
                                </Pill>
                                <Pill className="bg-sky-800/50 text-sky-200 border   border-sky-600/50">
                                    Threshold {12}
                                </Pill>
                            </div>
                        </div>
                    </div>

                    <div className={'w-4/5 h-full flex flex-col gap-3 0'}>
                        <div className={'w-full h-2/5'}></div>
                        <div className={'w-full h-3/5 p-2'}>
                            <HourByHourBarChart
                                uph={192}
                                chartData={hour_by_hour.map((_h) => {
                                    return { hour: _h.hour, qy: _h.units_pass }
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/*Modal*/}
            <WipDetailsModal
                open={isWipOpen}
                units={selectedUnits}
                onClose={() => {
                    setIsWipOpen(false)
                }}
            />
        </>
    )
}
const Pill = ({
    children,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}) => (
    <span
        className={`h-fit inline-flex items-center  rounded-xl   cursor-pointer   py-0.5 px-2  text-  whitespace-nowrap ${className}`}
    >
        {children}
    </span>
)
const DataCollectorsDetailsDeltas = ({
    units,
}: {
    units: HistoricRecord[]
}) => {
    const parser = ProcessUnitsToDeltas(units)
    return (
        <div className={'w-full h-[60px] '}>
            <DeltaHourChart data={parser} />
        </div>
    )
}

const DataCollectorDetails = ({
    label,
    num1,
}: {
    label: string
    num1: number
}) => {
    return (
        <div
            className={
                'flex flex-col  bg-neutral-900/50 border border-neutral-700/50 rounded-lg  transition-colors cursor-pointer hover:bg-neutral-700/30 p-2'
            }
        >
            <h3 className={'text-neutral-200'}>{label}</h3>
            <h3
                className={
                    'text-5xl text-stone-400 font-semibold tracking-wide'
                }
            >
                {num1}
            </h3>
        </div>
    )
}

const DataCollectorWIP = ({
    group_a,
    group_b,
    date,
    hour,
    line,
    onSelected,
}: {
    date: string
    hour: number
    line: string
    group_a: string
    group_b: string
    onSelected: (units: UnitItem[]) => void
}) => {
    const { data, isLoading, isError } = useGetWIPByHour(
        date,
        hour,
        line,
        group_a,
        group_b
    )

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!data) {
        return <div>No data</div>
    }
    if (isError) {
        return <div>Error</div>
    }
    return (
        <div
            className={
                'flex flex-col  bg-neutral-900/50 border border-neutral-700/50 rounded-lg  transition-colors cursor-pointer hover:bg-neutral-700/30 p-2'
            }
            onClick={() => {
                onSelected(data.units)
            }}
        >
            <h3 className={'text-neutral-200'}>WIP</h3>
            <h3
                className={
                    'text-5xl text-stone-400 font-semibold tracking-wide'
                }
            >
                {data.summary}
            </h3>
        </div>
    )
}

export default DataCollectorDetailsContainer
