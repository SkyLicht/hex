import React, {useState, useEffect} from 'react';

interface StationBannerProps {
    num1: number;
    num2: number;
    num3: number;
    num4: number;
    x: number;
    y: number;
    fontSize?: number;
    justify?: string;
}

const StationBanner: React.FC<StationBannerProps> = ({
                                                         num1,
                                                         num2,
                                                         num3,
                                                         num4,
                                                         x,
                                                         y,
                                                         fontSize = 12,
                                                         justify = "center"
                                                     }) => {
    const [showNum4, setShowNum4] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const rectWidth = 80;
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

    // Calculate text center position
    const textCenterX = (() => {
        if (justify === "center") {
            return x;
        }
        if (justify === "left") {
            return x - rectWidth / 2;
        }
        if (justify === "right") {
            return x + rectWidth / 2;
        }
        return x;
    })();

    // Column positions
    const col1X = textCenterX - 20; // First column (num1)
    const col2X = textCenterX + 20; // Second column (num2, num3)

    // Row positions
    const row1Y = y - 5; // First row
    const row2Y = y + 10; // Second row

    // num4 position - aligned to the left of the rectangle
    const num4X = rectX + 10; // Left aligned within the rectangle bounds

    return (
        <g>
            {/* Main rectangle */}
            <rect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                rx={4}
                fill="none"
                stroke={prussianBlue}
                strokeWidth={1.5}
            />

            {/* num1 - First column, centered vertically */}
            <text
                x={col1X}
                y={y}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="bold"
                fill={prussianBlue}
                fontFamily="var(--font-geist-mono)"
                style={{
                    dominantBaseline: "middle",
                    userSelect: "none"
                }}
            >
                {num1}
            </text>

            {/* num2 - Second column, first row */}
            <text
                x={col2X}
                y={row1Y}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="bold"
                fill={prussianBlue}
                fontFamily="var(--font-geist-mono)"
                style={{
                    dominantBaseline: "middle",
                    userSelect: "none"
                }}
            >
                {num2}
            </text>

            {/* num3 - Second column, second row */}
            <text
                x={col2X}
                y={row2Y}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="bold"
                fill={prussianBlue}
                fontFamily="var(--font-geist-mono)"
                style={{
                    dominantBaseline: "middle",
                    userSelect: "none"
                }}
            >
                {num3}
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
                        animation: "fadeInOutBounce 4s ease-in-out"
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