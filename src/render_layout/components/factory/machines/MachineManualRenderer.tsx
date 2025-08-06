import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
interface Props {
    machine: MachineRenderer
    variant: string
}
const MachineManualRenderer = ({ machine, variant }: Props) => {
    const color = 'var(--machine-default-color)'
    if (variant === 'manual_packing_machine') {
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

                <rect
                    width={machine.dimensions.width + 2}
                    height={machine.dimensions.height / 1.5}
                    y={
                        machine.dimensions.height / 2 -
                        machine.dimensions.height / 1.5 / 2
                    }
                    fill={color}
                    rx={0}
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

export default MachineManualRenderer
