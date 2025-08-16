'use client'
import React from 'react'
import { useGetDeltas } from '@/src/hooks/use_analytics'
import DeltasByHourChart from '@/src/components/charts/DeltasByHourChart'

const parseDataCollector = (dataCollector: string) => {
    const parts = dataCollector.split('_')
    const line = parts[0] // "J01"
    const station = parts.slice(1).join('_') // "SMT_INPUT1"

    return { line, station }
}

interface DataCollectorDeltasProps {
    dataCollector: string
    groupName: string
    lineName: string
}
const DataCollectorDeltasV3 = ({ dataCollector }: DataCollectorDeltasProps) => {
    const { line, station } = parseDataCollector(dataCollector)

    const { data, isLoading, isError, error } = useGetDeltas(line, station)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>
    if (!data) return <div>No data</div>

    return (
        <div className={'w-full h-full flex flex-col px-1 overflow-y-auto'}>
            <DeltasByHourChart data={data.deltas} />
        </div>
    )
}

export default DataCollectorDeltasV3
