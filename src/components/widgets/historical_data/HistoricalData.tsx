'use client'
import React from 'react'
import DataCollectorDetailsContainer from '@/src/components/widgets/historical_data/data_collector_details/DataCollectorDetailsContainer'

import {
    HistoricStationGroupByStation,
    HistoricStationHourSummary,
} from '@/src/components/widgets/historical_data/historic_types'
import { cn } from '@/lib/utils'
import { useGetDataGroupNameByHourAndDayLine } from '@/src/components/widgets/historical_data/use-get-data-group-name-by-hour-and-day-line'
import { uph_less_quantity } from '@/src/components/widgets/historical_data/uph_operations'
interface Props {
    selectedDate: string
    selected_line: string
    isLoading: boolean
}

//'SMT_INPUT2', 'SPI2', 'REFLOW_VI2', 'AOI_T2'
//'PTH_INPUT', 'TOUCH_INSPECT', 'TOUCH_UP'
//'ICT', 'FT'
//'FINAL_VI', 'FINAL_INSPECT', 'PACKING'

type DataCollectorDetailsState = {
    hour: string
    data_collector: string
    label: string
}
const data_collectors_low_runner = {
    smt_bot: {
        group_type: 'smt_bot',
        collectors: [
            {
                label: 'Input Bot',
                group_a: '',
                data_collector: 'SMT_INPUT1',
            },
            {
                label: 'SPI Bot',
                group_a: 'SMT_INPUT1',
                data_collector: 'SPI1',
            },
            {
                label: 'Reflow Bot',
                group_a: 'SPI1',
                data_collector: 'REFLOW_VI1',
            },
            {
                label: 'AOI Bot',
                group_a: 'REFLOW_VI1',
                data_collector: 'AOI_B2',
            },
        ],
    },
    smt_top: {
        group_type: 'smt_top',
        collectors: [
            {
                label: 'Input Top',
                group_a: 'AOI_B2',
                data_collector: 'SMT_INPUT2',
            },
            {
                label: 'SPI Top',
                group_a: 'SMT_INPUT2',
                data_collector: 'SPI2',
            },
            {
                label: 'Reflow Top',
                group_a: 'SPI2',
                data_collector: 'REFLOW_VI2',
            },
            {
                label: 'AOI Top',
                group_a: 'REFLOW_VI2',
                data_collector: 'AOI_T2',
            },
        ],
    },
    pth: {
        group_type: 'pth',
        collectors: [
            {
                label: 'Input PTH',
                group_a: 'AOI_T2',
                data_collector: 'PTH_INPUT',
            },
            {
                label: 'Inspect',
                group_a: 'PTH_INPUT',
                data_collector: 'TOUCH_INSPECT',
            },
            {
                label: 'Touch UP',
                group_a: 'TOUCH_INSPECT',
                data_collector: 'TOUCH_UP',
            },
        ],
    },
    test: {
        group_type: 'test',
        collectors: [
            {
                label: 'ICT',
                group_a: 'TOUCH_UP',
                data_collector: 'ICT',
            },
            {
                label: 'FT',
                group_a: 'ICT',
                data_collector: 'FT1',
            },
        ],
    },
    packing: {
        group_type: 'packing',
        collectors: [
            {
                label: 'Visual',
                group_a: 'FT1',
                data_collector: 'FINAL_VI',
            },
            {
                label: 'Final ',
                group_a: 'FINAL_VI',
                data_collector: 'FINAL_INSPECT',
            },
            {
                label: 'Packing',
                group_a: 'FINAL_INSPECT',
                data_collector: 'PACKING',
            },
        ],
    },
}

const FLOW = [
    'SMT_INPUT1',
    'SPI1',
    'REFLOW_VI1',
    'AOI_B2',
    'SMT_INPUT2',
    'SPI2',
    'REFLOW_VI2',
    'AOI_T2',
    'PTH_INPUT',
    'TOUCH_INSPECT',
    'TOUCH_UP',
    'ICT',
    'FT1',
    'FINAL_VI',
    'FINAL_INSPECT',
    'PACKING',
] as const

type Collector = (typeof FLOW)[number]

export const data_collectors_low_runner_list = (
    group_b: string
): Collector | 'none' => {
    const idx = FLOW.indexOf(group_b as Collector)
    return idx > 0 ? FLOW[idx - 1] : 'none'
}

const hour_24 = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
]

// const dummy_data = by_hour as HistoricHourSummary

function HistoricalData({ selectedDate, selected_line, isLoading }: Props) {
    const {
        data,
        isLoading: isLoad,
        isError,
    } = useGetDataGroupNameByHourAndDayLine(selectedDate, selected_line)

    const [selected, setSelected] = React.useState<
        DataCollectorDetailsState | undefined
    >()

    const [selectedId, setSelectedId] = React.useState<string | undefined>(
        undefined
    )

    if (isLoad) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    if (!data) {
        return <div>No data</div>
    }
    return (
        <div className={'w-full h-fit flex    '}>
            <div className={'w-full h-full flex flex-col gap-2'}>
                {hour_24.map((_h) => (
                    <HourlySummary
                        key={`ana-hourly-summary-${_h}`}
                        data={data.historical.by_hour[_h]}
                        hour={_h}
                        uph={data.uph[0].uph}
                        selected_line={selected_line}
                        selected_date={selectedDate}
                        byGroups={data.historical.hours_by_group}
                        selectedId={selectedId}
                        isDataCollectorSelected={selected}
                        setSelectedId={(id) => {
                            if (selectedId === id) {
                                setSelectedId(undefined)
                            } else {
                                setSelectedId(id)
                            }
                        }}
                        onDataCollectorSelected={(state) => {
                            if (
                                selected &&
                                selected.hour === state.hour &&
                                selected.data_collector === state.data_collector
                            ) {
                                setSelected(undefined)
                            } else {
                                setSelected(state)
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

const HourlySummary = ({
    data,
    hour,
    uph,
    byGroups,
    onDataCollectorSelected,
    selected_date,
    selected_line,
    selectedId,
    setSelectedId,
    isDataCollectorSelected,
}: {
    data: Record<string, HistoricStationHourSummary> | undefined
    hour: string
    uph: number
    selected_line: string
    selected_date: string
    byGroups: Record<string, HistoricStationGroupByStation[]> | undefined
    isDataCollectorSelected: DataCollectorDetailsState | undefined
    selectedId: string | undefined
    setSelectedId: (id: string) => void
    onDataCollectorSelected: (state: DataCollectorDetailsState) => void
}) => {
    if (!data || Object.keys(data).length === 0) {
        return null
    }

    return (
        <div className={'w-full '}>
            <div className={'w-fit h-full flex flex-row gap-1'}>
                <div
                    className={
                        'w-[50px]   flex flex-col justify-center    items-center'
                    }
                >
                    <p>{hour}</p>
                </div>
                {data_collectors_low_runner.smt_bot.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        id={`${hour}-${_d.data_collector}`}
                        uph={uph}
                        selectedId={selectedId}
                        label={_d.label}
                        onSelected={() => {
                            onDataCollectorSelected({
                                label: _d.label,
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                            setSelectedId(`${hour}-${_d.data_collector}`)
                        }}
                    />
                ))}

                {data_collectors_low_runner.smt_top.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        id={`${hour}-${_d.data_collector}`}
                        selectedId={selectedId}
                        uph={uph}
                        label={_d.label}
                        onSelected={() => {
                            onDataCollectorSelected({
                                label: _d.label,
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                            setSelectedId(`${hour}-${_d.data_collector}`)
                        }}
                    />
                ))}

                {data_collectors_low_runner.pth.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        uph={uph}
                        id={`${hour}-${_d.data_collector}`}
                        label={_d.label}
                        selectedId={selectedId}
                        onSelected={() => {
                            onDataCollectorSelected({
                                label: _d.label,
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                            setSelectedId(`${hour}-${_d.data_collector}`)
                        }}
                    />
                ))}

                {data_collectors_low_runner.test.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        uph={uph}
                        id={`${hour}-${_d.data_collector}`}
                        label={_d.label}
                        selectedId={selectedId}
                        onSelected={() => {
                            onDataCollectorSelected({
                                label: _d.label,
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                            setSelectedId(`${hour}-${_d.data_collector}`)
                        }}
                    />
                ))}

                {data_collectors_low_runner.packing.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        id={`${hour}-${_d.data_collector}`}
                        uph={uph}
                        selectedId={selectedId}
                        label={_d.label}
                        onSelected={() => {
                            onDataCollectorSelected({
                                label: _d.label,
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                            setSelectedId(`${hour}-${_d.data_collector}`)
                        }}
                    />
                ))}
            </div>
            {isDataCollectorSelected &&
                isDataCollectorSelected.hour === hour &&
                data?.[isDataCollectorSelected.data_collector] && (
                    <DataCollectorDetailsContainer
                        id={isDataCollectorSelected.data_collector}
                        data={data[isDataCollectorSelected.data_collector]}
                        hour_by_hour={
                            byGroups?.[
                                isDataCollectorSelected.data_collector
                            ] ?? []
                        }
                        uph={uph}
                        date={selected_date}
                        selected_hour={Number(hour)}
                        line={selected_line}
                        label={isDataCollectorSelected.label}
                        group_a={data_collectors_low_runner_list(
                            isDataCollectorSelected.data_collector
                        )}
                        group_b={isDataCollectorSelected.data_collector}
                    />
                )}
        </div>
    )
}

const DataCollectorSummary = ({
    id,
    data,
    label,
    onSelected,
    selectedId,
    uph,
}: {
    id: string
    data: HistoricStationHourSummary | undefined
    label: string
    onSelected: () => void
    selectedId: string | undefined
    uph: number
}) => {
    if (!data) {
        return (
            <div
                className={cn(
                    'h-[60px] w-[84px] flex flex-col  text-sm transition-colors rounded-lg ',
                    selectedId != undefined && selectedId === id
                        ? 'bg-transparent border-transparent hover:bg-neutral-700/30'
                        : 'bg-neutral-900/50 border border-neutral-700/50   hover:bg-neutral-700/30'
                )}
            >
                <div className={'flex items-center justify-center '}>
                    <h3
                        className={
                            'text-stone-200    font-semibold tracking-wide'
                        }
                    >
                        {label}
                    </h3>
                </div>
                <div
                    className={
                        'w-full  flex flex-row  items-center    justify-center   text-stone-400 px-2'
                    }
                >
                    <h3 className={'text-xl font-semibold'}>N/A</h3>
                </div>
            </div>
        )
    }
    return (
        <div
            className={cn(
                'h-[60px] w-[84px] flex flex-col  text-sm  cursor-pointer transition-colors rounded-lg ',
                selectedId != undefined && selectedId === id
                    ? 'bg-transparent border-transparent hover:bg-neutral-700/30'
                    : 'bg-neutral-900/50 border border-neutral-700/50   hover:bg-neutral-700/30'
            )}
            onClick={onSelected}
        >
            <div className={'flex items-center justify-center '}>
                <h3
                    className={cn(
                        selectedId != undefined && selectedId === id
                            ? 'text-blue-600  font-semibold tracking-wide'
                            : ' text-stone-200    font-semibold tracking-wide'
                    )}
                >
                    {label}
                </h3>
            </div>
            <div
                className={
                    'flex flex-row  justify-between   text-stone-400 px-2'
                }
            >
                <div>
                    <h3
                        className={cn(
                            'text-2xl font-semibold',
                            uph_less_quantity(uph, data.units_pass) >= 0
                                ? ''
                                : 'text-red-600'
                        )}
                    >
                        {data.units_pass}
                    </h3>
                </div>
                <div className={'flex flex-row gap-2'}>
                    <div>{data.units_fail}</div>
                </div>
            </div>
        </div>
    )
}

export default HistoricalData
