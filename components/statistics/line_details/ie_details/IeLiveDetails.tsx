import React from 'react';

import {catchErrorTyped, customPackagedError} from "@/lib/sl-request";
import {getWorkPlanByDateAndLineName} from "@/features/requests/work-plan-request";

interface Props {
    selectedLine: string;
}

const IeLiveDetails = async ({selectedLine}: Props) => {

    const [error_platform, work_plan] = await catchErrorTyped(
        getWorkPlanByDateAndLineName("2025-07-28", selectedLine),
        [...customPackagedError, Error],
    );
    if (error_platform || !work_plan) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-neutral-900 p-4">
                <div className="text-red-500 text-center">
                    {error_platform?.message || 'No work plan data available'}
                </div>

            </div>
        );
    }

    return (
        <div className="h-full flex flex-col text-neutral-900 border border-black p-4">
            <div className="flex flex-row gap-2 items-center">
                <h3 className="text-2xl">Line</h3>
                <h3 className="font-semibold text-xl">{selectedLine}</h3>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <h3 className="text-2xl">Model</h3>
                <h3 className="font-bold text-xl">{work_plan.platform.platform}</h3>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <h3 className="text-2xl">SKU</h3>
                <h3 className="font-bold text-xl">{work_plan.platform.sku}</h3>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <h3 className="text-2xl">UPH</h3>
                <h3 className="font-bold text-xl">{work_plan.uph || work_plan.platform.uph}</h3>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <h3 className="text-2xl">OEE</h3>
                <h3 className="font-bold text-xl">{Math.round(work_plan.target_oee * 100)}%</h3>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <h3 className="text-2xl">PH</h3>
                <h3 className="font-bold text-xl">{work_plan.planned_hours}h</h3>
            </div>
        </div>
    );
};

export default IeLiveDetails;