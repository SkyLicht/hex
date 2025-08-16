import React from 'react'
import { useGetWIP } from '@/src/hooks/use_wip'

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
const DataCollectorWip = ({ dataCollector }: DataCollectorDeltasProps) => {
    const { line, station } = parseDataCollector(dataCollector)
    const { data, isLoading, isError, error } = useGetWIP(line, station)
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>
    if (!data) return <div>No data</div>
    return (
        <div className={'w-full h-full overflow-y-auto flex flex-col '}>
            <div className={'w-full h-fit'}>
                <h3 className={'text-xl font-bold text-stone-300'}>
                    WIP {data?.length}
                </h3>
            </div>

            <div
                className={
                    'w-fit h-full overflow-y-auto pr-2 font-sans text-neutral-300'
                }
            >
                <div className="space-y-1">
                    {data?.map((_d) => (
                        <div
                            key={_d.ppid}
                            className="bg-neutral-900/50 border border-neutral-700/50 rounded-lg py-1 px-2 hover:bg-neutral-600/40  hover:border-transparent     transition-all duration-200 shadow-lg"
                        >
                            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center cursor-pointer">
                                <div>
                                    <p className="text-stone-400 text-xs uppercase tracking-wide">
                                        PPID
                                    </p>
                                    <p className="text-stone-200 font-bold">
                                        {_d.ppid}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-stone-400 text-xs uppercase tracking-wide">
                                        Collected
                                    </p>
                                    <p className="text-stone-300 font-mono text-sm">
                                        {_d.collected_timestamp}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-stone-400 text-xs uppercase tracking-wide">
                                        Station
                                    </p>
                                    <p className="text-stone-300 font-mono text-sm">
                                        {_d.group_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-stone-400 text-xs uppercase tracking-wide">
                                        Next Station
                                    </p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-800 text-emerald-200 whitespace-nowrap">
                                        {_d.next_station}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DataCollectorWip
