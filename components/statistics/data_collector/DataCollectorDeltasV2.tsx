'use client'
import React, {useState} from 'react';
import {usePPIDCurrentDayDeltas} from "@/hook/statistics/useGetDataCollectorDeltas";
import {DataCollectorNameToGroupName} from "@/lib/maps";
import {Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";

interface Props {
    groupName: string;
    lineName: string;
}


const PPIDDeltasDisplayV2 = ({groupName, lineName}: Props) => {

    const [sortOrder, setSortOrder] = useState<'none' | 'desc'>('none');

    const {data, loading, error, refetch} = usePPIDCurrentDayDeltas(DataCollectorNameToGroupName(groupName), lineName, {
        refetchInterval: 1020000, // Auto-refresh every 30 seconds
        enabled: true
    });

    if (loading) return <div className="flex items-center justify-center h-full">Loading deltas...</div>;
    if (error) return <div className="flex items-center justify-center h-full text-red-500">Error: {error}</div>;
    if (!data) return <div className="flex items-center justify-center h-full text-red-500">No data available</div>;

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('en-US', { hour12: false });
    };

    const formatDelta = (seconds: number) => {
        if (seconds < 60) {
            return `${seconds}s`;
        } else {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.round(seconds % 60);
            return `${minutes}m ${remainingSeconds}s`;
        }
    };

    const getDeltaColor = (seconds: number) => {
        if (seconds <= 10) return 'text-green-700';
        if (seconds <= 30) return 'text-yellow-600';
        if (seconds <= 60) return ' text-orange-800';
        return 'text-red-800';
    };

    const getSortedDeltas = () => {
        if (sortOrder === 'desc') {
            return [...data.listed_deltas].sort((a, b) => b.delta_seconds - a.delta_seconds);
        }
        return data.listed_deltas;
    };

    return (
        <div className={"flex flex-col justify-between h-full  w-full"}>
            <div className={"flex flex-col w-full h-full"}>

                <div className={"flex flex-row w-[1000px] h-full gap-2 "}>

                    <div className="h-full w-[350px] flex flex-col">
                        {/* Sort buttons */}
                        <div className="flex gap-2 mb-2">
                            <button
                                onClick={() => setSortOrder('desc')}
                                className={`px-3 py-1 text-sm rounded bg-blue-500 text-white  cursor-pointer  `}
                            >
                                Max to Min
                            </button>
                            <button
                                onClick={() => setSortOrder('none')}
                                className={`px-3 py-1 text-sm rounded cursor-pointer`}
                            >
                                reset
                            </button>
                        </div>
                        
                        {/* List */}
                        <div className="flex-1  overflow-y-auto">
                            {getSortedDeltas().map((delta, index) => (
                                <div key={index}
                                     className="flex flex-row  w-full justify-between items-center border border-gray-200  px-2 hover:bg-gray-50">
                                    <div className="flex flex-row gap-2 text-neutral-900 ">
                                        <span className="font-semibold ">From:</span>
                                        <span className=" ">{formatTime(delta.from_timestamp)}</span>
                                        <span className="font-semibold ">To</span>
                                        <span className="">{formatTime(delta.to_timestamp)}</span>
                                    </div>
                                    <span
                                        className={`inline-flex px-3  text-sm font-semibold rounded-full ${getDeltaColor(delta.delta_seconds)}`}>
                                {formatDelta(delta.delta_seconds)}
                            </span>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="h-fit flex flex-col gap-2">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500">Data Collector</h3>
                            <p className="text-xl font-bold text-gray-900">
                                {groupName}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500">Avg Delta</h3>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatDelta(data.statistics.avg_delta_seconds)}
                            </p>
                        </div>
                        {/*<div className="bg-gray-50 p-4 rounded-lg">*/}
                        {/*    <h3 className="text-sm font-medium text-gray-500">Min Delta</h3>*/}
                        {/*    <p className="text-2xl font-bold text-green-600">*/}
                        {/*        {formatDelta(data.statistics.min_delta_seconds)}*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500">Max Delta</h3>
                            <p className="text-2xl font-bold text-red-600">
                                {formatDelta(data.statistics.max_delta_seconds)}
                            </p>
                        </div>
                    </div>

                    <div className="h-full overflow-y-auto">
                        <table className="min-w-fit bg-white border border-gray-200 rounded-lg shadow ">
                            <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Hour
                                </th>
                                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Units
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {data.statistics.hourly_summary.map((hour, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4  text-sm text-gray-900 border-b">
                                        {hour.hour}
                                    </td>
                                    <td className="px-4 text-sm font-semibold text-neutral-900 border-b">
                                        {hour.quantity}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>

                </div>




            </div>


            {/*<div className={"flex flex-col w-full h-[200px]"}>*/}
            {/*    <ResponsiveContainer width="100%" height="100%">*/}
            {/*        <LineChart*/}
            {/*            width={150} height={40} data={data.listed_deltas.map(delta => ({name: `${delta.from_timestamp}-${delta.from_timestamp}`, delta: delta.delta_seconds}))}*/}

            {/*            margin={{*/}
            {/*                top: 5,*/}
            {/*                right: 10,*/}
            {/*                left: 10,*/}
            {/*                bottom: 5,*/}
            {/*            }}>*/}
            {/*            <Line dataKey="delta" stroke="#8884d8" isAnimationActive={false} dot={false}/>*/}
            {/*            <Tooltip*/}
            {/*                formatter={(value: number) => [`${(value / 60).toFixed(1)} min`, 'Delta']}*/}
            {/*                labelFormatter={(label) => label} // This will show the name field*/}
            {/*            />*/}


            {/*        </LineChart>*/}

            {/*    </ResponsiveContainer>*/}
            {/*</div>*/}

        </div>
    )
}


export default PPIDDeltasDisplayV2;