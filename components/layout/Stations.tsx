'use client'

import React, {useState} from "react";
import StationShapeManager from "@/components/layout/shapes/StationShapeManager";

import {GroupName} from "@/data/decoder/decoder-summary-update";
import {StationRender} from "@/features/requests/layout-config";
import StationBanner from "@/components/layout/live_data/StationBanner";


type SizeOption = "small" | "medium" | "normal" | "big";

interface StationsProps {
    stations: StationRender[];
    size: SizeOption;
    onSelectStation: (st: StationRender, event?: React.MouseEvent) => void;
    onSelectDataCollector: (dc: string) => void;
    offsetX?: number; // New prop
    offsetY?: number; // New prop
    groups: GroupName
}


type ShapeProps = {
    width: number;
    height: number;
    rx: number;
    fontSize: number;
};

function getStationShape(size: SizeOption, renderType: string | undefined): ShapeProps {
    if (size === "small") {
        if (renderType === "conveyor") {
            return {width: 15, height: 15, rx: 0, fontSize: 0};
        }
        if (renderType === "panasonic_npm") {
            return {width: 25, height: 35, rx: 0, fontSize: 0};
        }
        if (renderType === "loader") {
            return {width: 15, height: 35, rx: 0, fontSize: 0};
        }
        if (renderType === "buffer_ng") {
            return {width: 18, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "fuzion") {
            return {width: 40, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "reflow_oven") {
            return {width: 70, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "wave_oven") {
            return {width: 55, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "pallet") {
            return {width: 30, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "spi") {
            return {width: 25, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "manual_ass") {
            return {width: 20, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "juki") {
            return {width: 25, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "facc") {
            return {width: 15, height: 30, rx: 0, fontSize: 0};
        }
        if (renderType === "sliding") {
            return {width: 30, height: 20, rx: 0, fontSize: 0};
        }
        if (renderType === "conveyor_x7") {
            return {width: 70, height: 15, rx: 0, fontSize: 0};
        }
        if (renderType === "conveyor_x5") {
            return {width: 50, height: 15, rx: 0, fontSize: 0};
        }
        if (renderType === "conveyor_x4") {
            return {width: 30, height: 15, rx: 0, fontSize: 0};
        }
        if (renderType === "ict_auto") {
            return {width: 45, height: 35, rx: 0, fontSize: 0};
        }
        if (renderType === "ict") {
            return {width: 50, height: 60, rx: 0, fontSize: 0};
        }
        if (renderType === "install_hs") {
            return {width: 20, height: 30, rx: 0, fontSize: 0};
        }

        if (renderType === "battery_insert") {
            return {width: 30, height: 30, rx: 0, fontSize: 0};
        }

        if (renderType === "conveyor_x3") {
            return {width: 40, height: 15, rx: 0, fontSize: 0};
        }
        if (renderType === "rotator") {
            return {width: 20, height: 25, rx: 0, fontSize: 0};
        }

        if (renderType === "install_socket") {
            return {width: 25, height: 35, rx: 0, fontSize: 0};
        }

        if (renderType === "shuttle") {
            return {width: 20, height: 25, rx: 0, fontSize: 0};
        }

        if (renderType === "carrier") {
            return {width: 50, height: 30, rx: 0, fontSize: 0};
        }

        if (renderType === "ft_cell") {
            return {width: 50, height: 50, rx: 0, fontSize: 0};
        }
        if (renderType === "ft_grid") {
            return {width: 180, height: 90, rx: 0, fontSize: 0};
        }
        if (renderType === "back_plate") {
            return {width: 40, height: 60, rx: 0, fontSize: 0};
        }

        return {width: 30, height: 30, rx: 0, fontSize: 0};
    }
    if (size === "medium") {
        return {width: 45, height: 45, rx: 8, fontSize: 11};
    }
    if (size === "normal") {
        return {width: 70, height: 70, rx: 12, fontSize: 16};
    }
    return {width: 100, height: 100, rx: 16, fontSize: 20};
}

export const Stations: React.FC<StationsProps> = ({
                                                      stations,
                                                      size,
                                                      onSelectStation,
                                                      onSelectDataCollector,
                                                      offsetX = 0,
                                                      offsetY = 0,
                                                      groups
                                                  }) => {


    const shapes = stations.map(st => getStationShape(size, st.render_type || undefined));
    const widths = shapes.map(shape => shape.width);
    const gap = 2;

    const xCenters: number[] = [];
    const centerY = 100;
    let x = 20 + widths[0] / 2;
    xCenters.push(x);

    for (let i = 1; i < widths.length; i++) {
        x += (widths[i - 1] / 2) + gap + (widths[i] / 2);
        xCenters.push(x);
    }


    type OperatorAssignment = { i: number; operator: { render: "front" | "rear"; bound: string } };
    const operatorAssignments: OperatorAssignment[] = [];
    stations.forEach((st, i) => {
        if (Array.isArray(st.operators)) {
            st.operators.forEach(op => {
                operatorAssignments.push({i, operator: op});
            });
        }
    });

    const operatorGroups: Record<string, OperatorAssignment[]> = {};
    operatorAssignments.forEach(({i, operator}) => {
        if (!operatorGroups[operator.bound]) operatorGroups[operator.bound] = [];
        operatorGroups[operator.bound].push({i, operator});
    });


    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <g>
            {stations.map((st, i) => {

                const shape = shapes[i];
                // KEY: Detect hover per station
                const isHovered = hoveredIndex === i;
                const strokeWidth = isHovered ? 2 : 0;

                const x = xCenters[i] + offsetX;
                const y = centerY - (shape.height / 2) + offsetY;

                const isDataCollector = st.data_collector !== null;
                const dataCollectorName = st.data_collector?.name;
                const isDataName = isDataCollector && dataCollectorName !== null;
                const groupData = dataCollectorName ? groups[dataCollectorName] : null;


                return (
                    <g
                        key={i}
                        transform={`translate(${x - shape.width / 2}, ${y})`}
                        onClick={e => {
                            onSelectStation(st, e); // Pass the event
                            e.stopPropagation();
                        }}
                        onMouseEnter={() => {
                            setHoveredIndex(i)
                        }}
                        onMouseLeave={() => setHoveredIndex(null)}

                        style={{cursor: "pointer"}}
                    >
                        <StationShapeManager
                            render={st.render_type}
                            width={shape.width}
                            height={shape.height}
                            owner={st.owner}
                            strokeWidth={strokeWidth}
                            rx={shape.rx}
                        />

                        {/*{st.data_collector && (*/}

                        {/*)}*/}
                        {isDataName && groupData && (
                            <>

                                <g
                                    onClick={e => {
                                        e.stopPropagation();
                                        alert(`Data collector: ${st.data_collector!.name}`);
                                    }}
                                    style={{cursor: "pointer"}}
                                >
                                    <line
                                        x1={shape.width / 2}
                                        y1={-30}
                                        x2={shape.width / 2}
                                        y2={-5}
                                        stroke="#003153"
                                        strokeWidth={1}
                                        strokeDasharray="2 2"
                                    />

                                    <rect
                                        x={(shape.width - 10) / 2}
                                        y={-5}
                                        width={10}
                                        height={8}
                                        rx={0}
                                        fill="#003153"
                                    />

                                </g>

                                <StationBanner
                                    num1={groupData.total}
                                    num2={(groupData.fail_test == 0 ? 100 : (100 - ((groupData.fail_test / groupData.total) * 100)).toFixed(0)) as number}
                                    num3={groupData.fail_test}
                                    num4={groupData.total}
                                    num5={getMinutesToNow(groupData.last_added)}
                                    x={shape.width / 2}
                                    justify={st.data_collector?.render?.direction || "center"}
                                    y={-50}
                                    label={st.data_collector?.name || "none"}
                                    onClick={() => {
                                        console.log("Clicked on station banner");
                                        onSelectDataCollector(st.data_collector?.name || "none");

                                    }}
                                />

                            </>

                        )}


                    </g>
                )
            })}
            {/*{Object.entries(operatorGroups).map(([bound, members], groupIdx) => {*/}
            {/*    const byRender = {front: [] as OperatorAssignment[], rear: [] as OperatorAssignment[]};*/}
            {/*    members.forEach(m => {*/}
            {/*        if (m.operator.render === "front") byRender.front.push(m);*/}
            {/*        if (m.operator.render === "rear") byRender.rear.push(m);*/}
            {/*    });*/}

            {/*    const renderOperatorForDir = (group: OperatorAssignment[], dir: "front" | "rear") => {*/}
            {/*        if (group.length === 0) return null;*/}
            {/*        const groupX = group.map(({i}) => xCenters[i] + offsetX);*/}
            {/*        const operatorX = groupX.reduce((a, b) => a + b, 0) / groupX.length;*/}
            {/*        const maxHalfHeight = Math.max(...group.map(({i}) => shapes[i].height / 2));*/}
            {/*        const operatorY =*/}
            {/*            dir === "front"*/}
            {/*                ? centerY - maxHalfHeight - 38 + offsetY*/}
            {/*                : centerY + maxHalfHeight + 38 + offsetY;*/}

            {/*        return (*/}
            {/*            <g key={`${bound}_${dir}`}>*/}
            {/*                <UserIcon x={operatorX} y={operatorY} size={30}/>*/}
            {/*                {group.map(({i}, idx) => (*/}
            {/*                    <line*/}
            {/*                        key={idx}*/}
            {/*                        x1={xCenters[i] + offsetX}*/}
            {/*                        y1={*/}
            {/*                            dir === "front"*/}
            {/*                                ? centerY - shapes[i].height / 2 + offsetY*/}
            {/*                                : centerY + shapes[i].height / 2 + offsetY*/}
            {/*                        }*/}
            {/*                        x2={operatorX}*/}
            {/*                        y2={dir === "front" ? operatorY + 15 : operatorY - 15}*/}
            {/*                        stroke="#818cf8"*/}
            {/*                        strokeWidth={1}*/}
            {/*                        strokeDasharray="6 3"*/}
            {/*                    />*/}
            {/*                ))}*/}
            {/*            </g>*/}
            {/*        );*/}
            {/*    };*/}

            {/*    return (*/}
            {/*        <React.Fragment key={bound}>*/}
            {/*            {renderOperatorForDir(byRender.front, "front")}*/}
            {/*            {renderOperatorForDir(byRender.rear, "rear")}*/}
            {/*        </React.Fragment>*/}
            {/*    );*/}
            {/*})}*/}
        </g>
    );
};

const UserIcon: React.FC<{ x: number; y: number; size?: number }> = ({x, y, size = 30}) => (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="#6366f1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{display: "block"}}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"/>
            <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"/>
        </svg>
    </g>
);

export function getMinutesToNow(isoDateString: string): number {
    // Parse the UTC timestamp but treat it as if it's in local timezone
    const utcTime = new Date(isoDateString);

    // Create a new date with the same year, month, day, hour, minute, second
    // but in local timezone (ignoring the original timezone)
    const givenTime = new Date(
        utcTime.getUTCFullYear(),
        utcTime.getUTCMonth(),
        utcTime.getUTCDate(),
        utcTime.getUTCHours(),
        utcTime.getUTCMinutes(),
        utcTime.getUTCSeconds()
    );

    const currentTime = new Date();

    // Get difference in milliseconds, then convert to minutes
    const diffInMs = currentTime.getTime() - givenTime.getTime();
    return Math.floor(diffInMs / (1000 * 60));
}

