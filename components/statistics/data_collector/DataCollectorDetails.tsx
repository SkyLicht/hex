'use client'
import React from 'react';
import {useCurrentHourPPID, usePPIDCurrentDay} from "@/hook/statistics/use-get-datacollector-details";
import {DataCollectorNameToGroupName} from "@/lib/maps";

interface Props {
    collector_name: string,
    lane_name: string
}

const DataCollectorDetails = ({
                                  collector_name,
                                  lane_name
                              }: Props) => {


    const {data, loading, error, refetch} = usePPIDCurrentDay(DataCollectorNameToGroupName(collector_name), lane_name);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            {data && data.length > 0 ? (
                <div className=" w-[800] h-[500px] overflow-y-auto  ">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                        <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Timestamp
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                PPID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Group
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Station
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Model
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Fail
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                    {new Date(item.timestamp).toLocaleString()}
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-900 border-b">
                                    {item.ppid}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                    {item.group_name}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                    {item.station_name}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                    {item.model_name}
                                </td>
                                <td className="px-4 py-4 text-sm text-center border-b">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    item.error_flag === 1
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}>
                                                {item.error_flag === 1 ? 'Error' : 'OK'}
                                            </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    No data available
                </div>
            )}
        </div>
    );
};

export default DataCollectorDetails;

