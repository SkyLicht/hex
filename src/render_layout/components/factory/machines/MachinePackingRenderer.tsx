import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
interface Props {
    machine: MachineRenderer
    variant: string
}
const MachinePackingRenderer = ({ machine, variant }: Props) => {
    const color = 'var(--machine-default-color)'

    if (variant === 'packing_j02_machine') {
        return (
            <g
                transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
            >
                <rect
                    width={machine.dimensions.width}
                    height={machine.dimensions.height * 2}
                    x={0}
                    y={-machine.dimensions.height}
                    fill={color}
                />

                {/* Box storage area with box icon */}
                <g
                    transform={`translate(${machine.dimensions.width + 5}, ${-machine.dimensions.height / 2})`}
                >
                    {/* Background rectangle */}
                    {/*<rect*/}
                    {/*    width={machine.dimensions.width * 1.5}*/}
                    {/*    height={machine.dimensions.width * 1.5}*/}
                    {/*    fill={'var(--machine-default-color)'}*/}
                    {/*    stroke="#333"*/}
                    {/*    strokeWidth="1"*/}
                    {/*    rx="3"*/}
                    {/*/>*/}

                    {/* Box icon */}
                    <g
                        transform={`translate(${(machine.dimensions.width * 1.5) / 2 - 12}, ${(machine.dimensions.width * 1.5) / 2 - 12})`}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--machine-default-color)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                            <path d="m3.3 7 8.7 5 8.7-5" />
                            <path d="M12 22V12" />
                        </svg>
                    </g>
                </g>
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

export default MachinePackingRenderer
