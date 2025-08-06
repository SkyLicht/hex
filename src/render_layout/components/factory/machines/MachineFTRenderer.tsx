import React from 'react'

import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'

interface Props {
    machine: MachineRenderer
    variant: string
}
const MachineFtRenderer = ({ machine, variant }: Props) => {
    const color = '#561f71'
    if (variant === 'ft_grid_machine') {
        return (
            <g
                transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
            >
                {(() => {
                    const totalCells = 24
                    const cellsPerRow = Math.ceil(totalCells / 2)
                    const padding = 3
                    const middleRectHeight = 15
                    const cellGap = 10 // Small gap between cells and middle rectangle

                    // Calculate cell dimensions
                    const cellWidth =
                        (machine.dimensions.width -
                            padding * (cellsPerRow + 1)) /
                        cellsPerRow
                    const availableHeightPerRow =
                        (machine.dimensions.height -
                            middleRectHeight -
                            cellGap * 2) /
                        2
                    const cellHeight = availableHeightPerRow - padding

                    // Position calculations
                    const middleRectY =
                        machine.dimensions.height / 2 - middleRectHeight / 2
                    const topRowY = middleRectY - cellGap - cellHeight
                    const bottomRowY = middleRectY + middleRectHeight + cellGap

                    return (
                        <>
                            {/* Top row cells */}
                            {Array.from({ length: cellsPerRow }, (_, index) => {
                                const x =
                                    padding + index * (cellWidth + padding)

                                return (
                                    <rect
                                        key={`top-${index}`}
                                        width={cellWidth}
                                        height={cellHeight}
                                        x={x}
                                        y={topRowY}
                                        fill={color}
                                    />
                                )
                            })}

                            {/* Middle horizontal rectangle (full width) */}
                            <rect
                                width={machine.dimensions.width}
                                height={middleRectHeight}
                                x={0}
                                y={middleRectY}
                                // rx={machine.dimensions.rx}
                                fill={'var(--machine-default-color)'}
                            />

                            {/* Bottom row cells */}
                            {Array.from(
                                { length: totalCells - cellsPerRow },
                                (_, index) => {
                                    const x =
                                        padding + index * (cellWidth + padding)

                                    return (
                                        <rect
                                            key={`bottom-${index}`}
                                            width={cellWidth}
                                            height={cellHeight}
                                            x={x}
                                            y={bottomRowY}
                                            // rx={machine.dimensions.rx}
                                            fill={color}
                                        />
                                    )
                                }
                            )}
                        </>
                    )
                })()}
            </g>
        )
    }

    return (
        <rect
            x={machine.dimensions.x}
            y={machine.dimensions.y}
            width={machine.dimensions.width}
            height={machine.dimensions.height}
            fill={color}
            rx={0}
        />
    )
}

export default MachineFtRenderer
