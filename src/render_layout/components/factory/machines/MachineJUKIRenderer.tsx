import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'

interface Props {
    machine: MachineRenderer
}
const MachineJUKIRenderer = ({ machine }: Props) => {
    const color = '#1e588c'

    return (
        <g
            transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
        >
            <rect
                width={machine.dimensions.width}
                height={machine.dimensions.height / 2}
                y={machine.dimensions.height / 4}
                fill={color}
            />

            <circle
                cx={machine.dimensions.width / 4}
                cy={machine.dimensions.height * 0.05}
                r={machine.dimensions.width / 6}
                fill={color}
            />

            <circle
                cx={(machine.dimensions.width * 3) / 4}
                cy={machine.dimensions.height * 0.05}
                r={machine.dimensions.width / 6}
                fill={color}
            />

            <circle
                cx={machine.dimensions.width / 4}
                cy={machine.dimensions.height * 0.95}
                r={machine.dimensions.width / 6}
                fill={color}
            />

            <circle
                cx={(machine.dimensions.width * 3) / 4}
                cy={machine.dimensions.height * 0.95}
                r={machine.dimensions.width / 6}
                fill={color}
            />
        </g>
    )
}

export default MachineJUKIRenderer
