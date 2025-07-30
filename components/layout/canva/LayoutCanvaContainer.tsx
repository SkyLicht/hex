'use client'
import React from 'react';
import {useSearchParams} from "next/navigation";
import {useWebSocketMonitor} from "@/hook/use-data-collector-socket";
import LayoutCanva from "@/components/layout/canva/LayoutCanva";
import DataCollectorDetails from "@/components/statistics/data_collector/DataCollectorDetails";

const LayoutCanvaContainer = () => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const params = useSearchParams();
    const selected_line = params.get("selected_line") || null;
    const [selectedDataCollector, setSelectedDataCollector] = React.useState("none");

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
                selectedLine={selected_line}
                onOpenDialog={()=>{}}
                onOpenCollectorDetail={(collector_name: string)  => {
                    setSelectedDataCollector(collector_name);
                    openDialog()
                }}
            />

            {/* Dialog Overlay */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-2 flex flex-col w-[1500px] h-[560px]  shadow-xl">

                        <div className="flex justify-between mb-4 px-2 items-center">
                            <div>
                                <h3>{selectedDataCollector}</h3>
                            </div>
                            <button
                                onClick={closeDialog}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="w-full h-full flex ">
                            <DataCollectorDetails collector_name={selectedDataCollector} lane_name={selected_line}/>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default LayoutCanvaContainer;