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
}
const DataCollectorDeltas = ({ dataCollector }: DataCollectorDeltasProps) => {
    const { line, station } = parseDataCollector(dataCollector)

    const { data, isLoading, isError } = useGetDeltas(line, station)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    if (!data) return <div>No data</div>

    return (
        <div className={'w-full h-full flex flex-col p-4 overflow-y-auto'}>
            <DeltasByHourChart data={data.deltas} />
        </div>
    )
}

export default DataCollectorDeltas
// <rect
// width={TIMELINE_WIDTH}
// height="60"
// y="10"
// fill="#374151"
// rx="4"
//     />
