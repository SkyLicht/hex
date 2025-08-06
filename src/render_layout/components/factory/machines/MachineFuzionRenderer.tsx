import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
interface Props {
    machine: MachineRenderer
}
const MachineFuzionRenderer = ({ machine }: Props) => {
    const color = '#1e588c'

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

export default MachineFuzionRenderer
