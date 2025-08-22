import React from 'react'
import { HistoricStationHourSummary } from '@/src/components/widgets/historic/historic_types'

interface Props {
    id: string
    data: HistoricStationHourSummary
}
const DataCollectorDetailsContainer = ({ id, data }: Props) => {
    return (
        <div className={'w-full h-[400px] flex flex-col p-4 font-sans '}>
            <div className={'w-full h-[50px] bg-amber-400'}></div>
            <div className={'w-1/4 h-full flex flex-row border-2 border-black'}>
                <div className={'w-full h-full grid grid-cols-2 gap-2'}>
                    <DataCollectorDetails
                        label={'UNITS'}
                        num1={data.units_pass}
                    />
                    <DataCollectorDetails
                        label={'FAIL UNITS'}
                        num1={data.units_fail}
                    />
                    <DataCollectorDetails label={'WIP'} num1={100} />
                    <DataCollectorDetails label={'DOWNTIME'} num1={100} />
                </div>
                <div></div>
            </div>
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
        <div className={'border-2 border-black flex flex-col '}>
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

export default DataCollectorDetailsContainer
