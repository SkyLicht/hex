import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
import RenderContainerAnchors from '@/src/render_layout/components/render_shape/RenderContainerAnchors'

interface Props {
    machines: MachineRenderer[]
}

const FactoryMachinesRenderer = ({ machines }: Props) => {
    return (
        <g>
            {machines.map((machine) => {
                return (
                    <g key={machine.id}>
                        <rect
                            x={machine.dimensions.x}
                            y={machine.dimensions.y}
                            width={machine.dimensions.width}
                            height={machine.dimensions.height}
                            stroke={'#82a7c1'}
                            fill="transparent"
                        />
                        {/*<RenderContainerAnchors*/}
                        {/*    anchors={machine.dimensions.anchors}*/}
                        {/*/>*/}
                    </g>
                )
            })}
        </g>
    )
}

export default FactoryMachinesRenderer
