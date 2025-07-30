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
                    num3={2}
                    x={200}
                    y={150}
                    fontSize={14}
                    justify="center"
                />
            </svg>

            <div className="flex items-center gap-2 text-orange-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-flame"
                >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
                <span className="text-xl font-bold">{2}</span>
            </div>
        </div>
    );
};

export default ManagerPage;