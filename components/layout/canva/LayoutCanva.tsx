'use client'
import React, { useEffect, useRef, useState } from 'react'
import { SummaryLines } from '@/data/decoder/decoder-summary-update'
import { RenderLineLabel } from '@/components/layout/live_data/LineLabel'
import { getLayoutLine } from '@/features/requests/layout-config'
import { Stations } from '@/components/layout/Stations'
import { WipSummaryLines } from '@/data/decoder/decoder-summary-wip-update'

interface Props {
    currentHourSummary: SummaryLines
    wipSummary: WipSummaryLines
    selectedLine: string | null
    onOpenDialog: () => void // Add this prop
    onOpenCollectorDetail: (data_name: string) => void
}

const LayoutCanva = ({
    currentHourSummary,
    wipSummary,
    selectedLine,
    onOpenDialog,
    onOpenCollectorDetail,
}: Props) => {
    const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const anchorSVG = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const dragging = useRef(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

    // Mouse shape for drag-to-pan
    const onMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        dragging.current = true
        const svg = e.currentTarget
        const pt = svg.createSVGPoint()
        pt.x = e.clientX
        pt.y = e.clientY
        const ctm = svg.getScreenCTM()
        if (ctm) {
            const inv = ctm.inverse()
            const svgP = pt.matrixTransform(inv)
            anchorSVG.current = {
                x: svgP.x - pan.x,
                y: svgP.y - pan.y,
            }
        }
    }

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (dragging.current) {
            const svg = containerRef.current?.querySelector('svg')
            if (!svg) return

            const pt = svg.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            const ctm = svg.getScreenCTM()
            if (ctm) {
                const inv = ctm.inverse()
                const svgP = pt.matrixTransform(inv)

                setPan({
                    x: svgP.x - anchorSVG.current.x,
                    y: svgP.y - anchorSVG.current.y,
                })
            }
        }
    }

    const onMouseUp = () => {
        dragging.current = false
    }

    const layoutPosition = () => {
        type line_position = {
            id: string
            x: number
            y: number
            width: number
            height: number
        }

        const lines = [
            'J01',
            'J02',
            'J03',
            'J05',
            'J06',
            'J07',
            'J08',
            'J09',
            'J10',
            'J11',
        ]

        return lines.map((line, index) => {
            const line_position: line_position = {
                id: `unique-id-canva-${line}`,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }

            line_position.id = line
            line_position.x = 0
            line_position.y = index * 400
            line_position.width = 1520
            line_position.height = 400

            return line_position
        })
    }

    useEffect(() => {
        if (!selectedLine) return

        const selectedLinePosition = layoutPosition().find(
            (line) => line.id === selectedLine
        )

        if (selectedLinePosition) {
            setPan({
                x: selectedLinePosition.x,
                y: -selectedLinePosition.y,
            })
        }
    }, [selectedLine])

    return (
        <div
            className="h-full w-full  flex flex-col items-center "
            style={{ userSelect: dragging.current ? 'none' : 'auto' }}
            // onMouseMove={onMouseMove}
            // onMouseUp={onMouseUp}
            // onMouseLeave={onMouseUp}
        >
            {/* SVG Responsive Container */}
            <div
                ref={containerRef}
                className="w-full h-full overflow-auto flex items-center justify-center"
                // style={{cursor: dragging.current ? "grabbing" : "grab"}}
            >
                <svg
                    width="100%"
                    height="100%"
                    style={{
                        // transition: "width 0.3s, height 0.3s",
                        display: 'block',
                        // borderRadius: "1rem",
                        background: 'transparent',
                    }}
                >
                    <g
                        transform={`translate(${pan.x},${pan.y})`}
                        style={{ transition: 'transform 0.2s' }}
                    >
                        {layoutPosition().map((line, index) => {
                            const stations = getLayoutLine(line.id)

                            if (!stations) return <></>

                            return (
                                <g key={`${line.id}-${index}`}>
                                    <rect
                                        x={line.x}
                                        y={line.y}
                                        width={line.width}
                                        height={line.height}
                                        fill="none"
                                        stroke={'#003153'}
                                        strokeWidth={0}
                                        rx={3}
                                    />

                                    <RenderLineLabel
                                        label={line.id}
                                        x={line.x}
                                        y={line.y}
                                    />

                                    <Stations
                                        groups={currentHourSummary[line.id]}
                                        wips={wipSummary[line.id]}
                                        stations={stations.smt}
                                        size={'small'}
                                        onSelectStation={() => {
                                            onOpenDialog()
                                        }}
                                        onSelectDataCollector={(dc) => {
                                            onOpenCollectorDetail(dc)
                                        }}
                                        offsetX={line.x}
                                        offsetY={line.y + 50}
                                    />

                                    <Stations
                                        groups={currentHourSummary[line.id]}
                                        wips={wipSummary[line.id]}
                                        stations={stations.pth}
                                        size={'small'}
                                        onSelectStation={() => {
                                            onOpenDialog()
                                        }}
                                        onSelectDataCollector={(dc) => {
                                            onOpenCollectorDetail(dc)
                                        }}
                                        offsetX={line.x + 250}
                                        offsetY={line.y + 250}
                                    />
                                </g>
                            )
                        })}
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default LayoutCanva
