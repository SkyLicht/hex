'use client'
import React from 'react'
import DataCollectorDetailsContainer from '@/src/components/widgets/historic/data_collector_details/DataCollectorDetailsContainer'
import by_hour from '@/public/dummy/by_hour.json'
import {
    HistoricHourSummary,
    HistoricStationHourSummary,
} from '@/src/components/widgets/historic/historic_types'
interface Props {
    selectedDate: string
}

//'SMT_INPUT2', 'SPI2', 'REFLOW_VI2', 'AOI_T2'
//'PTH_INPUT', 'TOUCH_INSPECT', 'TOUCH_UP'
//'ICT', 'FT'
//'FINAL_VI', 'FINAL_INSPECT', 'PACKING'

type DataCollectorDetailsState = {
    hour: string
    data_collector: string
}
const data_collectors_low_runner = {
    smt_bot: {
        group_type: 'smt_bot',
        collectors: [
            {
                label: 'Input Bot',
                data_collector: 'SMT_INPUT2',
            },
            {
                label: 'SPI Bot',
                data_collector: 'SPI2',
            },
            {
                label: 'Reflow Bot',
                data_collector: 'REFLOW_VI2',
            },
            {
                label: 'AOI Bot',
                data_collector: 'AOI_T2',
            },
        ],
    },
    smt_top: {
        group_type: 'smt_top',
        collectors: [
            {
                label: 'Input Top',
                data_collector: 'SMT_INPUT1',
            },
            {
                label: 'SPI Top',
                data_collector: 'SPI1',
            },
            {
                label: 'Reflow Top',
                data_collector: 'REFLOW_VI1',
            },
            {
                label: 'AOI Top',
                data_collector: 'AOI_B2',
            },
        ],
    },
    pth: {
        group_type: 'pth',
        collectors: [
            {
                label: 'Input PTH',
                data_collector: 'PTH_INPUT',
            },
            {
                label: 'Inspect',
                data_collector: 'TOUCH_INSPECT',
            },
            {
                label: 'Touch UP',
                data_collector: 'TOUCH_UP',
            },
        ],
    },
    test: {
        group_type: 'test',
        collectors: [
            {
                label: 'ICT',
                data_collector: 'ICT',
            },
            {
                label: 'FT',
                data_collector: 'FT1',
            },
        ],
    },
    packing: {
        group_type: 'packing',
        collectors: [
            {
                label: 'Visual',
                data_collector: 'FINAL_VI',
            },
            {
                label: 'Final ',
                data_collector: 'FINAL_INSPECT',
            },
            {
                label: 'Packing',
                data_collector: 'PACKING',
            },
        ],
    },
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

const dummy_data = by_hour as HistoricHourSummary

function HistoricalData({ selectedDate }: Props) {
    const [selected, setSelected] = React.useState<
        DataCollectorDetailsState | undefined
    >()
    return (
        <div className={'w-full h-fit flex border-2 border-black select-none '}>
            <div className={'w-full h-full flex flex-col gap-2'}>
                {hour_24.map((_h) => (
                    <HourlySummary
                        key={`ana-hourly-summary-${_h}`}
                        data={dummy_data.by_hour['11']}
                        hour={_h}
                        isDataCollectorSelected={selected}
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
    onDataCollectorSelected,
    isDataCollectorSelected,
}: {
    data: Record<string, HistoricStationHourSummary> | undefined
    hour: string
    isDataCollectorSelected: DataCollectorDetailsState | undefined
    onDataCollectorSelected: (state: DataCollectorDetailsState) => void
}) => {
    if (!data) {
        return null
    }
    return (
        <div className={'w-full '}>
            <div className={'w-fit h-full flex flex-row gap-2'}>
                <div className={'w-[50px]   flex flex-col'}>{hour}</div>
                {data_collectors_low_runner.smt_bot.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        id={_d.data_collector}
                        label={_d.label}
                        onSelected={() => {
                            onDataCollectorSelected({
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                        }}
                    />
                ))}

                {data_collectors_low_runner.smt_bot.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        id={_d.data_collector}
                        label={_d.label}
                        onSelected={() => {
                            onDataCollectorSelected({
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                        }}
                    />
                ))}

                {data_collectors_low_runner.pth.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        id={_d.data_collector}
                        label={_d.label}
                        onSelected={() => {
                            onDataCollectorSelected({
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                        }}
                    />
                ))}

                {data_collectors_low_runner.test.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        id={_d.data_collector}
                        label={_d.label}
                        onSelected={() => {
                            onDataCollectorSelected({
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                        }}
                    />
                ))}

                {data_collectors_low_runner.packing.collectors.map((_d) => (
                    <DataCollectorSummary
                        key={_d.data_collector}
                        data={data[_d.data_collector]}
                        id={_d.data_collector}
                        label={_d.label}
                        onSelected={() => {
                            onDataCollectorSelected({
                                data_collector: _d.data_collector,
                                hour: hour,
                            })
                        }}
                    />
                ))}
            </div>
            {isDataCollectorSelected &&
                isDataCollectorSelected.hour === hour && (
                    <DataCollectorDetailsContainer
                        id={isDataCollectorSelected.data_collector}
                        data={data[isDataCollectorSelected.data_collector]}
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
}: {
    id: string
    data: HistoricStationHourSummary
    label: string
    onSelected: () => void
}) => {
    return (
        <div
            className={
                'h-[70px] w-[80px] flex flex-col text-sm  border-2 cursor-pointer'
            }
            onClick={onSelected}
        >
            <div className={'flex items-center justify-center'}>
                <h3>{label}</h3>
            </div>
            <div className={'flex flex-row gap-2'}>
                <div>{data.units_pass}</div>
                <div>-</div>
            </div>
            <div className={'flex flex-row gap-2'}>
                <div>{data.units_fail}</div>
                <div>+</div>
            </div>
        </div>
    )
}

export default HistoricalData
