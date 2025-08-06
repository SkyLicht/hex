import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'

interface Props {
    machine: MachineRenderer
}
const MachineRadialRenderer = ({ machine }: Props) => {
    const color = '#1e588c'

    return (
        <g
            transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
        >
            <rect
                width={machine.dimensions.width}
                height={machine.dimensions.height / 2}
                y={machine.dimensions.height / 3}
                fill={color}
            />

            <rect
                width={machine.dimensions.width - 10}
                height={
                    machine.dimensions.height / 3 -
                    machine.dimensions.height / 10
                }
                y={
                    machine.dimensions.height / 2 +
                    (machine.dimensions.height / 10) * 3
                }
                x={5}
                fill={color}
            />
        </g>
    )
}

export default MachineRadialRenderer
