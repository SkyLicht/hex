import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'

interface Props {
    machine: MachineRenderer
}
const MachineFACCRenderer = ({ machine }: Props) => {
    const color = 'var(--machine-default-color)'

    return (
        <g
            transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
        >
            <rect
                width={machine.dimensions.width}
                height={machine.dimensions.height * 0.8}
                fill={color}
            />

            <rect
                width={machine.dimensions.width}
                height={machine.dimensions.height * 0.4}
                y={machine.dimensions.height - 5}
                fill={color}
            />
        </g>
    )
}

export default MachineFACCRenderer
