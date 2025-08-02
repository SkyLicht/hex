'use client'
import React from 'react';
import {useSearchParams} from "next/navigation";
import {useWebSocketMonitor} from "@/hook/use-data-collector-socket";
import LayoutCanva from "@/components/layout/canva/LayoutCanva";
import PPIDDeltasDisplayV2 from "@/components/statistics/data_collector/DataCollectorDeltasV2";

const LayoutCanvaContainer = () => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const params = useSearchParams();
    const selected_line = params.get("selected_line") || null;
    const [selectedDataCollector, setSelectedDataCollector] = React.useState("none");

    const {currentHourSummary, currentWip,connectionStatus, error, reconnect} = useWebSocketMonitor(
        'ws://10.13.33.129:8051/ws/monitor',
        {
            onMessage: (message) => {
                console.log('WebSocket message received', message);
            },
            onConnect: () => {
                console.log('WebSocket connected');
            },
            onDisconnect: () => {
                console.log('WebSocket disconnected');
            }
        }
    );

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className={"h-full w-full text-neutral-900  relative"}>
            <LayoutCanva
                currentHourSummary={currentHourSummary}
                wipSummary={currentWip}
                selectedLine={selected_line}
                onOpenDialog={()=>{}}
                onOpenCollectorDetail={(collector_name: string)  => {
                    setSelectedDataCollector(collector_name);
                    openDialog()
                }}
            />

            {/* Dialog Overlay */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#e7e8ed] rounded-lg p-2 w-[1500px] h-[560px] shadow-xl relative">

                        <div className="absolute top-2 right-2 z-10 flex justify-between mb-4 px-2 items-center">
                            <button
                                onClick={closeDialog}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="w-full h-full flex">
                            <PPIDDeltasDisplayV2 groupName={selectedDataCollector} lineName={selected_line || "none"}/>
                        </div>
                    </div>

                </div>

            )}
        </div>
    );
};

export default LayoutCanvaContainer;