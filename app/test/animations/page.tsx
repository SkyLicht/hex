'use client'
import React from 'react';
import PPIDDeltasDisplayV2 from "@/components/statistics/data_collector/DataCollectorDeltasV2";


const ManagerPage = () => {
    return (
        <div className={"h-full w-full flex items-center justify-center bg-amber-50"}>
            <PPIDDeltasDisplayV2 groupName={"PACKING"} lineName={"J01"}/>
        </div>
    );
};

export default ManagerPage;