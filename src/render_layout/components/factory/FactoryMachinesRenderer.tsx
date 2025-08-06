import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
import RenderContainerAnchors from '@/src/render_layout/components/render_shape/RenderContainerAnchors'
import MachineSlidingRenderer from '@/src/render_layout/components/factory/machines/MachineSlidingRenderer'
import MachineFtRenderer from '@/src/render_layout/components/factory/machines/MachineFTRenderer'
import MachineICTRenderer from '@/src/render_layout/components/factory/machines/MachineICTRenderer'
import MachineBackPlateRenderer from '@/src/render_layout/components/factory/machines/MachineBackPlateRenderer'
import MachineNPMRenderer from '@/src/render_layout/components/factory/machines/MachineNPMRenderer'
import MachineFuzionRenderer from '@/src/render_layout/components/factory/machines/MachineFuzionRenderer'
import MachineBufferRenderer from '@/src/render_layout/components/factory/machines/MachineNgBufferRenderer'
import MachineManualRenderer from '@/src/render_layout/components/factory/machines/MachineManualRenderer'
import MachinePackingRenderer from '@/src/render_layout/components/factory/machines/MachinePackingRenderer'
import MachineConveyorAeroRenderer from '@/src/render_layout/components/factory/machines/MachineConveyorAreoRenderer'
import MachineRadialRenderer from '@/src/render_layout/components/factory/machines/MachineRadialRenderer'
import MachineFACCRenderer from '@/src/render_layout/components/factory/machines/MachineFACCRenderer'
import MachineJUKIRenderer from '@/src/render_layout/components/factory/machines/MachineJUKIRenderer'

interface Props {
    machines: MachineRenderer[]
}

const FactoryMachinesRenderer = ({ machines }: Props) => {
    return (
        <g>
            {machines.map((machine) => {
                return (
                    <g key={machine.id}>
                        <SelectMachine {...machine} />
                        {/*<RenderContainerAnchors*/}
                        {/*    anchors={machine.dimensions.anchors}*/}
                        {/*/>*/}
                    </g>
                )
            })}
        </g>
    )
}

const SelectMachine = (machine: MachineRenderer) => {
    if (machine.render.type === 'sliding_machine') {
        return <MachineSlidingRenderer machine={machine} />
    }

    if (machine.render.type === 'ft_grid_machine') {
        return (
            <MachineFtRenderer machine={machine} variant={'ft_grid_machine'} />
        )
    }

    if (machine.render.type === 'ft_cell_machine') {
        return (
            <MachineFtRenderer machine={machine} variant={'ft_cell_machine'} />
        )
    }

    if (machine.render.type === 'ict_grid_machine') {
        return (
            <MachineICTRenderer
                machine={machine}
                variant={'ict_grid_machine'}
            />
        )
    }

    if (machine.render.type === 'ict_auto_machine') {
        return (
            <MachineICTRenderer
                machine={machine}
                variant={'ict_auto_machine'}
            />
        )
    }

    if (machine.render.type === 'back_plate_machine') {
        return <MachineBackPlateRenderer machine={machine} />
    }

    if (machine.render.type === 'npm_machine') {
        return <MachineNPMRenderer machine={machine} />
    }

    if (machine.render.type === 'fuzion_machine') {
        return <MachineFuzionRenderer machine={machine} />
    }

    if (machine.render.type === 'buffer_machine') {
        return (
            <MachineBufferRenderer
                machine={machine}
                variant={'buffer_machine'}
            />
        )
    }
    if (machine.render.type === 'sorted_buffer_machine') {
        return (
            <MachineBufferRenderer
                machine={machine}
                variant={'sorted_buffer_machine'}
            />
        )
    }

    if (machine.render.type === 'manual_packing_machine') {
        return (
            <MachineManualRenderer
                machine={machine}
                variant={'manual_packing_machine'}
            />
        )
    }

    if (machine.render.type === 'packing_j02_machine') {
        return (
            <MachinePackingRenderer
                machine={machine}
                variant={'packing_j02_machine'}
            />
        )
    }

    if (machine.render.type === 'conveyor_aero_machine') {
        return (
            <MachineConveyorAeroRenderer
                machine={machine}
                variant={'conveyor_aero_machine'}
            />
        )
    }

    if (machine.render.type === 'radial_machine') {
        return <MachineRadialRenderer machine={machine} />
    }

    if (machine.render.type === 'facc_machine') {
        return <MachineFACCRenderer machine={machine} />
    }

    if (machine.render.type === 'juki_machine') {
        return <MachineJUKIRenderer machine={machine} />
    }

    return (
        <rect
            x={machine.dimensions.x}
            y={machine.dimensions.y}
            width={machine.dimensions.width}
            height={machine.dimensions.height}
            fill={'#3b3e43'}
            rx={0}
        />
    )
}

export default FactoryMachinesRenderer
