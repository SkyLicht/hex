import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'

interface Props {
    machine: MachineRenderer
}
const MachineBackPlateRenderer = ({ machine }: Props) => {
    return (
        <g
            transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
        >
            <rect
                width={15}
                height={20}
                x={5}
                fill={'var(--machine-default-color)'}
            />

            <rect
                width={15}
                height={20}
                x={5}
                y={machine.dimensions.height - 20}
                fill={'var(--machine-default-color)'}
            />

            <rect
                width={machine.dimensions.width}
                height={15}
                y={machine.dimensions.height / 2 - 7.5}
                fill={'var(--machine-default-color)'}
            />
        </g>
    )
}

export default MachineBackPlateRenderer
