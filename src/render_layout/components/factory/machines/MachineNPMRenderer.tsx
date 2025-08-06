import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'

interface Props {
    machine: MachineRenderer
}
const MachineNpmRenderer = ({ machine }: Props) => {
    const color = '#1e588c'

    return (
        <g
            transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
        >
            <rect
                width={machine.dimensions.width}
                height={machine.dimensions.height}
                fill={color}
            />

            <rect
                width={machine.dimensions.width / 3}
                height={
                    machine.dimensions.height / 2 -
                    machine.dimensions.height / 10
                }
                y={-(machine.dimensions.height / 10) * 2}
                x={machine.dimensions.width / 10}
                fill={color}
            />

            <rect
                width={machine.dimensions.width / 3}
                height={
                    machine.dimensions.height / 2 -
                    machine.dimensions.height / 10
                }
                y={-(machine.dimensions.height / 10) * 2}
                x={
                    machine.dimensions.width -
                    machine.dimensions.width / 3 -
                    machine.dimensions.height / 10
                }
                fill={color}
            />

            <rect
                width={machine.dimensions.width / 3}
                height={
                    machine.dimensions.height / 2 -
                    machine.dimensions.height / 10
                }
                y={
                    machine.dimensions.height / 2 +
                    (machine.dimensions.height / 10) * 3
                }
                x={
                    machine.dimensions.width -
                    machine.dimensions.width / 3 -
                    machine.dimensions.height / 10
                }
                fill={color}
            />

            <rect
                width={machine.dimensions.width / 3}
                height={
                    machine.dimensions.height / 2 -
                    machine.dimensions.height / 10
                }
                y={
                    machine.dimensions.height / 2 +
                    (machine.dimensions.height / 10) * 3
                }
                x={machine.dimensions.width / 10}
                fill={color}
            />
        </g>
    )
}

export default MachineNpmRenderer
