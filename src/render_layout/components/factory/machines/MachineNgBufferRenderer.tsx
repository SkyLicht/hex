import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
interface Props {
    machine: MachineRenderer
    variant: string
}
const MachineNgBufferRenderer = ({ machine, variant }: Props) => {
    const color = '#0a3647'
    if (variant === 'buffer_machine') {
        if (machine.render.direction === 'left') {
            return (
                <g
                    transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
                >
                    <rect
                        width={machine.dimensions.width / 2 + 2}
                        x={machine.dimensions.width / 2 - 2}
                        y={machine.dimensions.height / 2 - 2}
                        height={machine.dimensions.height / 2}
                        fill={color}
                    />

                    <line
                        x1={machine.dimensions.width / 2 - 2}
                        y1={machine.dimensions.height / 5}
                        x2={machine.dimensions.width}
                        y2={machine.dimensions.height / 5}
                        stroke={color}
                        strokeWidth={2}
                    />

                    <rect
                        width={machine.dimensions.width / 2}
                        height={machine.dimensions.height}
                        x={0}
                        fill={color}
                    />
                </g>
            )
        }
        return (
            <g
                transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
            >
                {/*<rect*/}
                {/*    width={machine.dimensions.width / 2 + 10}*/}
                {/*    height={*/}
                {/*        machine.dimensions.height -*/}
                {/*        machine.dimensions.height / 3*/}
                {/*    }*/}
                {/*    y={*/}
                {/*        machine.dimensions.height / 2 -*/}
                {/*        machine.dimensions.height / 3*/}
                {/*    }*/}
                {/*    fill={color}*/}
                {/*/>*/}

                <rect
                    width={machine.dimensions.width / 2 + 10}
                    x={0}
                    y={machine.dimensions.height / 2 - 2}
                    height={machine.dimensions.height / 2}
                    fill={color}
                />

                <line
                    x1={0}
                    y1={machine.dimensions.height / 5}
                    x2={machine.dimensions.width / 2 + 10}
                    y2={machine.dimensions.height / 5}
                    stroke={color}
                    strokeWidth={2}
                />

                {/*<line*/}
                {/*    x1={0}*/}
                {/*    y1={machine.dimensions.height / 2}*/}
                {/*    x2={machine.dimensions.width / 2}*/}
                {/*    y2={machine.dimensions.height / 2}*/}
                {/*    stroke={color}*/}
                {/*    strokeWidth={2}*/}
                {/*/>*/}

                {/*<line*/}
                {/*    x1={0}*/}
                {/*    y1={*/}
                {/*        machine.dimensions.height -*/}
                {/*        machine.dimensions.height / 5*/}
                {/*    }*/}
                {/*    x2={machine.dimensions.width / 2}*/}
                {/*    y2={*/}
                {/*        machine.dimensions.height -*/}
                {/*        machine.dimensions.height / 5*/}
                {/*    }*/}
                {/*    stroke={color}*/}
                {/*    strokeWidth={2}*/}
                {/*/>*/}
                <rect
                    width={machine.dimensions.width / 2}
                    height={machine.dimensions.height}
                    x={machine.dimensions.width / 2}
                    fill={color}
                />
            </g>
        )
    }

    if (variant === 'sorted_buffer_machine')
        return (
            <g
                transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
            >
                <rect
                    width={machine.dimensions.width}
                    height={machine.dimensions.height}
                    fill={color}
                    rx={0}
                />
            </g>
        )
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

export default MachineNgBufferRenderer
