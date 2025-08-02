'use client'
import React, { useState } from 'react';
import { usePPIDCurrentDayDeltas } from "@/hook/statistics/useGetDataCollectorDeltas";

interface Props {
    groupName: string;
    lineName: string;
}

const PPIDDeltasDisplay = ({ groupName, lineName }: Props) => {
    const [activeTab, setActiveTab] = useState<'statistics' | 'deltas' | 'grouped'>('statistics');
    const { data, loading, error, refetch } = usePPIDCurrentDayDeltas(groupName, lineName, {
        refetchInterval: 30000, // Auto-refresh every 30 seconds
        enabled: true
    });

    if (loading) return <div className="flex items-center justify-center h-full">Loading deltas...</div>;
    if (error) return <div className="flex items-center justify-center h-full text-red-500">Error: {error}</div>;
    if (!data) return <div className="flex items-center justify-center h-full text-red-500">No data available</div>;

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString();
    };

    const formatDelta = (seconds: number) => {
        if (seconds < 60) {
            return `${seconds}s`;
        } else {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}m ${remainingSeconds}s`;
        }
    };

    const getDeltaColor = (seconds: number) => {
        if (seconds <= 10) return 'bg-green-100 text-green-800';
        if (seconds <= 30) return 'bg-yellow-100 text-yellow-800';
        if (seconds <= 60) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <div className="w-full h-full flex flex-col overflow-hidden bg-white rounded-lg shadow">
            {/* Header with tabs and refresh button */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab('statistics')}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                            activeTab === 'statistics'
                                ? 'bg-blue-100 text-blue-800'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Statistics
                    </button>
                    <button
                        onClick={() => setActiveTab('deltas')}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                            activeTab === 'deltas'
                                ? 'bg-blue-100 text-blue-800'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Delta History
                    </button>
                    <button
                        onClick={() => setActiveTab('grouped')}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                            activeTab === 'grouped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Grouped
                    </button>
                </div>
                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                    Refresh
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {data ? (
                    <div className="h-full overflow-y-auto p-4">
                        {/* Statistics Tab */}
                        {activeTab === 'statistics' && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500">Total Records</h3>
                                    <p className="text-2xl font-bold text-gray-900">{data.statistics.total_records}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500">Total Deltas</h3>
                                    <p className="text-2xl font-bold text-gray-900">{data.statistics.total_deltas}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500">Avg Delta</h3>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {formatDelta(data.statistics.avg_delta_seconds)}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500">Min Delta</h3>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatDelta(data.statistics.min_delta_seconds)}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500">Max Delta</h3>
                                    <p className="text-2xl font-bold text-red-600">
                                        {formatDelta(data.statistics.max_delta_seconds)}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500">Total Groups</h3>
                                    <p className="text-2xl font-bold text-gray-900">{data.total_groups}</p>
                                </div>
                            </div>
                        )}

                        {/* Delta History Tab */}
                        {activeTab === 'deltas' && (
                            <div className="space-y-3">
                                {data.listed_deltas.map((delta, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-xs text-gray-500">FROM:</span>
                                                    <span className="font-mono text-sm">{delta.from_ppid}</span>
                                                    <span className="text-xs text-gray-500">{formatTime(delta.from_timestamp)}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs text-gray-500">TO:</span>
                                                    <span className="font-mono text-sm">{delta.to_ppid}</span>
                                                    <span className="text-xs text-gray-500">{formatTime(delta.to_timestamp)}</span>
                                                </div>
                                            </div>
                                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getDeltaColor(delta.delta_seconds)}`}>
                                                {formatDelta(delta.delta_seconds)}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            Sequence: {index + 1} of {data.listed_deltas.length}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Grouped Tab */}
                        {activeTab === 'grouped' && (
                            <div>
                                <h3 className="text-lg font-medium mb-4">Deltas Under 1 Minute ({data.grouped_deltas.deltas_1_min.length})</h3>
                                <div className="overflow-hidden">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                                        <thead className="bg-gray-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                From PPID
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                To PPID
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                From Time
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                To Time
                                            </th>
                                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Delta
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {data.grouped_deltas.deltas_1_min.map((delta, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-4 text-sm font-mono text-gray-900 border-b">
                                                    {delta.from_ppid}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-mono text-gray-900 border-b">
                                                    {delta.to_ppid}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                                    {formatTime(delta.from_timestamp)}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                                    {formatTime(delta.to_timestamp)}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-center border-b">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDeltaColor(delta.delta_seconds)}`}>
                                                            {formatDelta(delta.delta_seconds)}
                                                        </span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        No delta data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default PPIDDeltasDisplay;