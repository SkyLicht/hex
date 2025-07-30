import React, {useState, useEffect} from 'react';

interface StationBannerProps {
    num1: number;
    num2: number;
    num3: number;
    num4: number;
    num5: number;
    x: number;
    y: number;
    fontSize?: number;
    justify?: string;
    label: string;
    onClick: () => void;
}

const StationBanner: React.FC<StationBannerProps> = ({
                                                         num1,
                                                         num2,
                                                         num3,
                                                         num4,
                                                         num5,
                                                         x,
                                                         y,
                                                         fontSize = 12,
                                                         justify = "center",
                                                         label,
                                                         onClick
                                                     }) => {
    const [showNum4, setShowNum4] = useState(true);
    const [animationKey, setAnimationKey] = useState(0);

    const rectWidth = 73;
    const rectHeight = 40;
    const prussianBlue = "#003153";

    // Animation for num4 - triggers whenever num4 changes
    useEffect(() => {
        setShowNum4(false); // Hide first

        const showTimer = setTimeout(() => {
            setShowNum4(true);
            setAnimationKey(prev => prev + 1); // Force re-render for animation

            // Hide after 3 seconds
            const hideTimer = setTimeout(() => {
                setShowNum4(false);
            }, 3900);

            return () => clearTimeout(hideTimer);
        }, 100);

        return () => clearTimeout(showTimer);
    }, [num4]); // Dependency on num4 to trigger on value change

    // Calculate rectangle position based on justify
    const rectX = (() => {
        if (justify === "center") {
            return x - rectWidth / 2;
        }
        if (justify === "left") {
            return x - rectWidth;
        }
        if (justify === "right") {
            return x;
        }
        return x - rectWidth / 2;
    })();

    const rectY = y - rectHeight / 2;


    // 2x2 Grid positions - Left aligned
    const gridSpacingX = 40; // Distance between columns
    const gridSpacingY = 19; // Distance between rows
    const leftMargin = 3; // Left margin from rectangle edge

    // Column positions (0 = left, 1 = right) - aligned to left
    const col0X = rectX + leftMargin; // Left column
    const col1X = rectX + leftMargin + gridSpacingX; // Right column

    // Row positions (0 = top, 1 = bottom)
    const row0Y = y - gridSpacingY / 2; // Top row
    const row1Y = y + gridSpacingY / 2; // Bottom row

    // num4 position - aligned to the left of the rectangle
    const num4X = rectX + 10; // Left aligned within the rectangle bounds


    return (
        <g
            onClick={e => {
                onClick(); // Call the onClick prop
                e.stopPropagation();
            }}
            style={{cursor: "pointer"}}
        >
            {/* Invisible clickable area - covers the entire banner */}
            <rect
                x={rectX}
                y={rectY - 25} // Extended to cover label area above
                width={rectWidth}
                height={rectHeight + 25} // Extended height to include label
                fill="transparent"
                stroke="none"

            />
            {/* Add this filter definition in your SVG's <defs> section */}
            <defs>
                <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow
                        dx="2"
                        dy="2"
                        stdDeviation="3"
                        floodColor="rgba(0,0,0,0.3)"
                    />
                </filter>
            </defs>


            {/* Main rectangle */}
            <rect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                rx={5}

                fill="#eff0f3"
                stroke={prussianBlue}
                strokeWidth={0}
                filter="url(#dropShadow)"

            />

            {/* Rest of your existing code remains the same */}
            {/* num1 - Position (0,0) - Top left */}
            <text
                x={rectX}
                y={rectY - 10}
                textAnchor="start"
                fontSize={8}
                fontWeight="bold"
                fill={prussianBlue}
                fontFamily="var(--font-geist-mono)"
                style={{
                    dominantBaseline: "middle",
                    userSelect: "none",
                    pointerEvents: "none" // Prevent text from interfering with clicks
                }}
            >
                {label}
            </text>

            {/* num5 - Position (0,1) - Top right */}
            <text
                x={col1X}
                y={row0Y + 2}
                textAnchor="start"
                fontSize={fontSize}
                fontWeight="bold"
                fill={prussianBlue}
                fontFamily="var(--font-geist-mono)"
                style={{
                    dominantBaseline: "middle",
                    userSelect: "none",
                    pointerEvents: "none"
                }}
            >
                {num5}
            </text>

            <text
                x={col0X}
                y={row0Y + 2}
                textAnchor="start"
                fontSize={fontSize}
                fontWeight="bold"
                fill={prussianBlue}
                fontFamily="var(--font-geist-mono)"
                style={{
                    dominantBaseline: "middle",
                    userSelect: "none",
                    pointerEvents: "none"
                }}
            >
                {num1}
            </text>

            {/* num2 - Position (1,0) - Bottom left */}
            <text
                x={col0X}
                y={row1Y + 2}
                textAnchor="start"
                fontSize={fontSize - 4}
                fontWeight="bold"
                fill={prussianBlue}
                fontFamily="var(--font-geist-mono)"
                style={{
                    dominantBaseline: "middle",
                    userSelect: "none",
                    pointerEvents: "none"
                }}
            >
                {num2}%
            </text>


            {/* num4 - Above rectangle with simple fade animation, left aligned, with + sign */}
            {showNum4 && (
                <text
                    key={animationKey} // Force re-render for animation restart
                    x={num4X}
                    y={rectY - 10}
                    textAnchor="start" // Left align the text
                    fontSize={fontSize + 2}
                    fontWeight="bold"
                    fill="#d82222"
                    fontFamily="var(--font-geist-mono)"
                    style={{
                        dominantBaseline: "middle",
                        userSelect: "none",
                        animation: "fadeInOutBounce 4s ease-in-out",
                        pointerEvents: "none"
                    }}
                >
                    +{num4}
                </text>
            )}

            {/* CSS animation definition */}
            <defs>
                <style>
                    {`
            @keyframes fadeInOutBounce {
                0% { 
                    opacity: 0; 
                    transform: translateY(-10px) ; 
                }
                15% { 
                    opacity: 1; 
                    transform: translateY(0px) ; 
                }
                25% { 
                    transform: translateY(0px); 
                }
                75% { 
                    opacity: 1; 
                    transform: translateY(0px) ; 
                }
                100% { 
                    opacity: 0; 
                    transform: translateY(-3px) ; 
                }
            }
        `}
                </style>
            </defs>
        </g>
    );

};

export default StationBanner;