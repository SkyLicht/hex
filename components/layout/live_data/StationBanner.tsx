import React, {useState, useEffect} from 'react';

interface StationBannerProps {
    num1: number;
    num2: number;
    num3: number;
    x: number;
    y: number;
    fontSize?: number;
    justify?: 'left' | 'center' | 'right';
    label: string;
    onClick: () => void;
}

const StationBanner: React.FC<StationBannerProps> = ({
                                                         num1,
                                                         num2,
                                                         num3,
                                                         x,
                                                         y,
                                                         fontSize = 12,
                                                         justify = 'center',
                                                         label,
                                                         onClick,
                                                     }) => {
    const rectWidth = 73;
    const rectHeight = 40;
    const prussianBlue = '#003153';

    const rectX = justify === 'center' ? x - rectWidth / 2 : justify === 'left' ? x - rectWidth : x;
    const rectY = y - rectHeight / 2;

    const gridSpacingX = 40;
    const gridSpacingY = 19;
    const leftMargin = 3;

    const col0X = rectX + leftMargin;
    const col1X = rectX + leftMargin + gridSpacingX;
    const row0Y = y - gridSpacingY / 2;
    const row1Y = y + gridSpacingY / 2;

    return (
        <g
            onClick={(e) => {
                onClick();
                e.stopPropagation();
            }}
            style={{cursor: 'pointer'}}
        >
            <rect
                x={rectX}
                y={rectY - 25}
                width={rectWidth}
                height={rectHeight + 25}
                fill="transparent"
                stroke="none"
            />

            <defs>
                <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="1" floodColor={num3 > 3 ? "rgba(138,23,51,0.2)":"rgba(0,0,0,0.3)"}/>
                </filter>
            </defs>

            <rect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                rx={5}
                fill={"#eff0f3"}
                stroke={prussianBlue}
                strokeWidth={0}
                filter="url(#dropShadow)"
            />

            {/* Label */}
            <text
                x={rectX}
                y={rectY - 8}
                textAnchor="start"
                fontSize={12}
                fontWeight="bold"
                fill={prussianBlue}
                style={{dominantBaseline: 'middle', userSelect: 'none', pointerEvents: 'none'}}
            >
                {label}
            </text>

            {/* num1 - Top left */}
            <text
                x={col0X}
                y={row0Y + 2}
                textAnchor="start"
                fontSize={fontSize}
                fontWeight="bold"
                fill={prussianBlue}

                style={{dominantBaseline: 'middle', userSelect: 'none', pointerEvents: 'none'}}
            >
                {num1}
            </text>

            {/* num2 - Bottom left */}
            <text
                x={col0X}
                y={row1Y + 2}
                textAnchor="start"
                fontSize={fontSize - 1 }
                fontWeight="bold"
                fill={prussianBlue}

                style={{dominantBaseline: 'middle', userSelect: 'none', pointerEvents: 'none'}}
            >
                {num2}%
            </text>

            {/* flame icon above num3 */}

            {num3 > 3 && (
                <g transform={`translate(${col1X + 2}, ${row1Y - 36}) scale(1)`}>
                    <path
                        d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3
             -1.072-2.143-.224-4.054 2-6
             .5 2.5 2 4.9 4 6.5
             2 1.6 3 3.5 3 5.5
             a7 7 0 1 1-14 0
             c0-1.153.433-2.294 1-3
             a2.5 2.5 0 0 0 2.5 2.5z"
                        fill="none"
                        stroke="#FF5722"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            )}


            {/* num3 - Bottom right */}
            <text
                x={col1X + (num3 < 9 ? 10 : num3 < 99 ? 3 : -3)}
                y={row1Y - 3}
                fontSize={fontSize + 5}
                fontWeight="bold"
                fill="#FF5722"
                style={{dominantBaseline: 'middle', userSelect: 'none', pointerEvents: 'none'}}
            >
                {num3}
            </text>
        </g>
    );
};

export default StationBanner;
