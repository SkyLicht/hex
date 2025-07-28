'use client'
import React from 'react';

import LayoutCanvas from "@/components/layout/LayoutCanvas";
import {useWebSocketMonitor} from "@/hook/use-data-collector-socket";
import {useLineHeader} from "@/hook/use-line-header";
import IeLiveDetails from "@/components/statistics/line_details/ie_details/IeLiveDetails";


const ViewLayout = () => {

    const {currentHourSummary, connectionStatus, error, reconnect} = useWebSocketMonitor(
        'ws://localhost:9091/ws/monitor',
        {
            onMessage: (message) => {

            },
            onConnect: () => {
                console.log('WebSocket connected');
            },
            onDisconnect: () => {
                console.log('WebSocket disconnected');
            }
        }
    );


    return (
        <div
            className={"h-full w-full bg-[#eff0f3] flex flex-col items-center p-2"}
        >

            <section className={"h-3/5 w-full "}>
                <LayoutCanvas currentHourSummary={currentHourSummary}/>
            </section>
            <section className={"h-2/5 border-black border-2 w-full flex flex-row justify-between "}>
                {/*WebSocket status indicator */}
                <div className="flex items-center gap-2">
                    <div
                        className={`w-3 h-3 rounded-full ${
                            connectionStatus === 'connected' ? 'bg-green-500' :
                                connectionStatus === 'connecting' ? 'bg-yellow-500' :
                                    'bg-red-500'
                        }`}
                        title={`WebSocket: ${connectionStatus}`}
                    />
                    {connectionStatus === 'error' && (
                        <button
                            onClick={reconnect}
                            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            title="Reconnect WebSocket"
                        >
                            Reconnect
                        </button>
                    )}
                </div>
                <IeLiveDetails/>
            </section>

        </div>
    );
};


export default ViewLayout;