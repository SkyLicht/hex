'use client'
import React from 'react';
import StationBanner from "@/components/layout/live_data/StationBanner";


const ManagerPage = () => {
    return (
        <div className={"h-full w-full flex items-center justify-center bg-amber-50"}>
            <svg width="400" height="300" className="border border-gray-300">
                <StationBanner 
                    num1={100}
                    num2={85}
                    num3={92}
                    num4={7}
                    x={200}
                    y={150}
                    fontSize={14}
                    justify="center"
                />
            </svg>
        </div>
    );
};

export default ManagerPage;