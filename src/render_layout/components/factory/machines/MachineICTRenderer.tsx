import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
interface Props {
    machine: MachineRenderer
    variant: string
}
const MachineIctRenderer = ({ machine, variant }: Props) => {
    const color = '#561f71'

    if (variant === 'ict_grid_machine') {
        return (
            <g
                transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
            >
                <rect
                    width={15}
                    height={20}
                    x={machine.dimensions.width - 20}
                    fill={color}
                />

                <rect width={15} height={20} x={5} fill={color} />
                <rect
                    width={15}
                    height={20}
                    x={machine.dimensions.width - 20}
                    y={machine.dimensions.height - 20}
                    fill={color}
                />

                <rect
                    width={15}
                    height={20}
                    x={5}
                    y={machine.dimensions.height - 20}
                    fill={color}
                />

                <rect
                    width={machine.dimensions.width}
                    height={15}
                    fill={'var(--machine-default-color)'}
                    y={machine.dimensions.height / 2 - 7.5}
                />
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

export default MachineIctRenderer
