import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
interface Props {
    machine: MachineRenderer
    variant: string
}
const MachineConveyorAero = ({ machine, variant }: Props) => {
    const color = 'var(--machine-default-color)'
    return (
        <g
            transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
        >
            <rect
                width={machine.dimensions.width}
                height={machine.dimensions.height * 1.5}
                x={0}
                y={0}
                fill={color}
            />

            <rect
                width={machine.dimensions.width * 14}
                height={machine.dimensions.width}
                x={0}
                y={machine.dimensions.height * 1.3}
                fill={color}
            />

            <rect
                width={machine.dimensions.width}
                height={machine.dimensions.height / 2}
                x={machine.dimensions.width * 13}
                y={machine.dimensions.height + 2}
                fill={color}
            />
        </g>
    )
}

export default MachineConveyorAero
