'use client'
import React, { useEffect, useState } from 'react'

const generateRandomData = () =>
    Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))

const AnimatedGraph: React.FC = () => {
    const [data, setData] = useState(generateRandomData())

    // Update data every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setData(generateRandomData())
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    const width = 500
    const height = 200
    const padding = 40

    const maxY = Math.max(...data)
    const minY = Math.min(...data)

    const getX = (index: number) =>
        padding + (index / (data.length - 1)) * (width - 2 * padding)
    const getY = (value: number) =>
        height -
        padding -
        ((value - minY) / (maxY - minY)) * (height - 2 * padding)

    const pathData = data
        .map((val, idx) => `${idx === 0 ? 'M' : 'L'}${getX(idx)},${getY(val)}`)
        .join(' ')

    return (
        <div className="p-4">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                {/* Axes */}
                <line
                    x1={padding}
                    y1={padding}
                    x2={padding}
                    y2={height - padding}
                    stroke="#ccc"
                />
                <line
                    x1={padding}
                    y1={height - padding}
                    x2={width - padding}
                    y2={height - padding}
                    stroke="#ccc"
                />

                {/* Animated Line */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    style={{
                        transition: 'd 0.8s ease-in-out',
                    }}
                />

                {/* Dots */}
                {data.map((val, idx) => (
                    <circle
                        key={idx}
                        cx={getX(idx)}
                        cy={getY(val)}
                        r={4}
                        fill="#3b82f6"
                        className="transition-all duration-500"
                    />
                ))}
            </svg>
        </div>
    )
}

export default AnimatedGraph
