import { FactoryRenderA6 } from '@/src/render_layout/type/factory-render-a6'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
import { RendererMachineContainer } from '@/src/render_layout/renderer/renderer_machines/renderer-machine-container'
import {
    GetResolution,
    ViewBoxResolution,
    ViewBoxType,
} from '@/src/render_layout/type/view-box-type'
import RendererMachineLoader from '@/src/render_layout/renderer/renderer_machines/renderer-machine-loader'
import RendererMachineConveyor from '@/src/render_layout/renderer/renderer_machines/renderer-machine-conveyor'
import RendererMachineSPI from '@/src/render_layout/renderer/renderer_machines/renderer-machine-spi'
import RendererMachineGKG from '@/src/render_layout/renderer/renderer_machines/renderer-machine-gkg'
import RendererMachineBufferNg from '@/src/render_layout/renderer/renderer_machines/renderer-machine-buffer-ng'
import RendererMachineShuttle from '@/src/render_layout/renderer/renderer_machines/renderer-machine-shuttle'
import RendererMachineNPM from '@/src/render_layout/renderer/renderer_machines/renderer-machine-npm'
import RendererMachineFuzion from '@/src/render_layout/renderer/renderer_machines/renderer-machine-fuzion'
import RendererMachineSliding from '@/src/render_layout/renderer/renderer_machines/renderer-machine-sliding'
import RendererMachineReflow from '@/src/render_layout/renderer/renderer_machines/renderer-machine-reflow'
import RendererMachineInsert from '@/src/render_layout/renderer/renderer_machines/renderer-machine-insert'
import RendererMachineAoi from '@/src/render_layout/renderer/renderer_machines/renderer-machine-aoi'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'
import RendererDataCollector from '@/src/render_layout/renderer/renderer-data-banners/renderer-data-collector'
import { LineGroupRenderer } from '@/src/render_layout/type/line-render'
import RendererMachineRadial from '@/src/render_layout/renderer/renderer_machines/renderer-machine-radial'
import RendererMachineFacc from '@/src/render_layout/renderer/renderer_machines/renderer-machine-facc'
import RendererMachineManual from '@/src/render_layout/renderer/renderer_machines/renderer-machine-manual'
import RendererMachineWave from '@/src/render_layout/renderer/renderer_machines/renderer-machine-wave'
import RendererMachineCarrier from '@/src/render_layout/renderer/renderer_machines/renderer-machine-carrier'
import RendererMachineICT from '@/src/render_layout/renderer/renderer_machines/renderer-machine-ict'
import RendererMachineInstallHS from '@/src/render_layout/renderer/renderer_machines/renderer-machine-install-hs'
import RendererMachineFT from '@/src/render_layout/renderer/renderer_machines/renderer-machine-ft'
import RendererMachineInstallSocket from '@/src/render_layout/renderer/renderer_machines/rernerer-machine-install-socket'
import RendererMachineCPU from '@/src/render_layout/renderer/renderer_machines/renrere-machine-cpu_assembly'
import RendererMachinePacking from '@/src/render_layout/renderer/renderer_machines/renderer-machine-packing'
import RendererMachineFlux from '@/src/render_layout/renderer/renderer_machines/renderer-machine-flux'
import RendererMachineBattery from '@/src/render_layout/renderer/renderer_machines/renderer-machine-battery'

export class LayoutRender {
    factory: FactoryRenderA6
    private resolution: ViewBoxResolution
    private readonly viewType: ViewBoxType

    constructor(
        render: FactoryRenderA6,
        resolution: ViewBoxType = ViewBoxType.H_W_M_1536
    ) {
        this.viewType = resolution
        this.resolution = GetResolution(resolution)
        this.factory = render
        this.measure()
    }

    measure() {
        this.measureProductionArea()
        this.measureProductionLine()
    }

    measureProductionArea() {
        this.factory.areas.production_area.dimensions.width =
            this.resolution.width
        this.factory.areas.production_area.dimensions.height =
            this.resolution.height
        this.factory.areas.production_area.dimensions.x = 0
        this.factory.areas.production_area.dimensions.y = 0
    }

    measureProductionLine() {
        this.factory.lines.forEach((line, index) => {
            line.dimensions.width = this.resolution.width
            line.dimensions.height = 380
            line.dimensions.x = 0
            line.dimensions.y = index * 400 // Spacing >= height to avoid overlap

            this.measureMachines(
                line.machines,
                line.groups,
                10,
                line.dimensions.y + 110
            )
            this.measureDataCollectors(line.data_collectors, line.machines)
        })
    }

    measureMachines(
        machines: MachineRenderer[],
        groups: LineGroupRenderer[],
        baseX: number,
        baseY: number
    ) {
        groups.forEach((group, groupIndex) => {
            // Calculate group starting position
            const groupX = baseX
            const groupY = baseY + groupIndex * 150 // Adjust vertical spacing between groups

            let currentX = groupX
            let currentY = groupY

            // Get machines for this group based on range
            const groupMachines = machines.slice(
                group.range_form,
                group.range_to
            )

            groupMachines.forEach((machine) => {
                const direction = machine.render.direction || 'right'
                let posX = currentX
                let posY = currentY

                const _renderer = this.mapMachine(
                    machine.render.type,
                    posX,
                    posY
                )

                if (direction === 'left') {
                    // Para izquierda, retrocede ANTES de asignar la posición
                    posX -=
                        _renderer.container.dimensions.width +
                        _renderer.container.position.offSet.x
                    currentX = posX
                }

                if (direction === 'top') {
                    posY -=
                        _renderer.container.dimensions.height +
                        _renderer.container.position.offSet.y
                    currentY = posY
                }

                //             machine.dimensions.x = _renderer.container.position.point.x
                //             machine.dimensions.y = _renderer.container.position.point.y

                // Ahora sí, asigna
                machine.dimensions.width = _renderer.container.dimensions.width
                machine.dimensions.height =
                    _renderer.container.dimensions.height
                machine.dimensions.x = posX
                machine.dimensions.y = posY
                machine.dimensions.anchors = _renderer.container.anchors

                if (direction === 'right') {
                    currentX +=
                        _renderer.container.dimensions.width +
                        _renderer.container.position.offSet.x
                }
                if (direction === 'bottom') {
                    currentY +=
                        _renderer.container.dimensions.height +
                        _renderer.container.position.offSet.y
                }
            })
        })
    }

    // measureMachines(
    //     machines: MachineRenderer[],
    //     groups: LineGroupRenderer[],
    //     baseX: number,
    //     baseY: number
    // ) {
    //     groups.forEach((group, groupIndex) => {
    //         // Calculate group starting position
    //         const groupX = baseX
    //         const groupY = baseY + groupIndex * 150 // Adjust vertical spacing between groups
    //
    //         let currentX = groupX
    //         let currentY = groupY
    //
    //         // Get machines for this group based on range
    //         const groupMachines = machines.slice(
    //             group.range_form,
    //             group.range_to
    //         )
    //
    //         groupMachines.forEach((machine) => {
    //             const _renderer = this.mapMachine(
    //                 machine.render.type,
    //                 currentX,
    //                 currentY
    //             )
    //
    //             // Ensure the machine has proper dimensions and anchors
    //             machine.dimensions.width = _renderer.container.dimensions.width
    //             machine.dimensions.height =
    //                 _renderer.container.dimensions.height
    //             machine.dimensions.x = _renderer.container.position.point.x
    //             machine.dimensions.y = _renderer.container.position.point.y
    //
    //             // IMPORTANT: Initialize anchors from the renderer
    //             machine.dimensions.anchors = _renderer.container.anchors
    //
    //             // Update position based on direction
    //
    //             const direction = machine.render.direction || 'right'
    //
    //             switch (direction) {
    //                 case 'right':
    //                     currentX +=
    //                         _renderer.container.dimensions.width +
    //                         _renderer.container.position.offSet.x
    //                     break
    //
    //                 case 'left':
    //                     currentX -=
    //                         _renderer.container.dimensions.width +
    //                         _renderer.container.position.offSet.x
    //                     console.log(
    //                         'width',
    //                         _renderer.container.dimensions.width
    //                     )
    //                     console.log('currentX', currentX)
    //                     break
    //
    //                 case 'top':
    //                     currentY -=
    //                         _renderer.container.dimensions.height +
    //                         _renderer.container.position.offSet.y
    //                     break
    //
    //                 case 'bottom':
    //                     currentY +=
    //                         _renderer.container.dimensions.height +
    //                         _renderer.container.position.offSet.y
    //                     break
    //
    //                 default:
    //                     // Default to right movement
    //                     currentX +=
    //                         _renderer.container.dimensions.width +
    //                         _renderer.container.position.offSet.x
    //                     break
    //             }
    //         })
    //     })
    // }

    measureDataCollectors(
        collectors: DataCollectorRenderer[],
        machines: MachineRenderer[]
    ) {
        collectors.forEach((_dc) => {
            const _machine = this.findMachine(_dc.link, machines)
            if (!_machine) return

            // Use the correct anchors from the configuration
            const fromAnchor = _dc.render.from_anchor // Machine anchor
            const toAnchor = _dc.render.to_anchor // Banner anchor - FIX: was using from_anchor twice!

            const _dcr = new RendererDataCollector(
                _machine.dimensions.anchors, // Target machine's anchors
                {
                    from: fromAnchor, // Machine anchor point
                    to: toAnchor, // Banner anchor point
                },
                25 // Distance between banner and machine
            )

            // Store the calculated measurements
            _dc.linked_line = _dcr.linked_line
            _dc.dimensions = {
                x: _dcr.container.position.point.x,
                y: _dcr.container.position.point.y,
                width: _dcr.container.dimensions.width,
                height: _dcr.container.dimensions.height,
                anchors: _dcr.container.anchors,
            }
        })
    }

    findMachine(
        machineId: string,
        machines: MachineRenderer[]
    ): MachineRenderer | undefined {
        return machines.find((machine) => machine.id === machineId)
    }

    mapMachine(
        machineStr: string,
        x: number,
        y: number,
        direction: string = 'right'
    ): RendererMachineContainer {
        switch (machineStr) {
            case 'loader_machine':
                return new RendererMachineLoader(x, y, this.viewType, direction)
            case 'conveyor_x1_machine':
                return new RendererMachineConveyor(
                    x,
                    y,
                    this.viewType,
                    'x1',
                    direction
                )
            case 'conveyor_x2_machine':
                return new RendererMachineConveyor(
                    x,
                    y,
                    this.viewType,
                    'x2',
                    direction
                )
            case 'conveyor_x3_machine':
                return new RendererMachineConveyor(
                    x,
                    y,
                    this.viewType,
                    'x3',
                    direction
                )
            case 'conveyor_x5_machine':
                return new RendererMachineConveyor(
                    x,
                    y,
                    this.viewType,
                    'x5',
                    direction
                )
            case 'conveyor_x7_machine':
                return new RendererMachineConveyor(
                    x,
                    y,
                    this.viewType,
                    'x7',
                    direction
                )
            case 'gkg_machine':
                return new RendererMachineGKG(x, y, this.viewType, direction)
            case 'spi_machine':
                return new RendererMachineSPI(x, y, this.viewType, direction)
            case 'buffer_machine':
                return new RendererMachineBufferNg(
                    x,
                    y,
                    this.viewType,
                    direction
                )
            case 'shuttle_machine':
                return new RendererMachineShuttle(
                    x,
                    y,
                    this.viewType,
                    direction
                )
            case 'npm_machine':
                return new RendererMachineNPM(x, y, this.viewType, direction)
            case 'sliding_machine':
                return new RendererMachineSliding(
                    x,
                    y,
                    this.viewType,
                    direction
                )
            case 'fuzion_machine':
                return new RendererMachineFuzion(x, y, this.viewType, direction)
            case 'aoi_machine':
                return new RendererMachineAoi(x, y, this.viewType, direction)
            case 'reflow_machine':
                return new RendererMachineReflow(x, y, this.viewType, direction)
            case 'insert_machine':
                return new RendererMachineInsert(x, y, this.viewType, direction)
            case 'remove_machine':
                return new RendererMachineInsert(x, y, this.viewType, direction)
            case 'radial_machine':
                return new RendererMachineRadial(x, y, this.viewType, direction)
            case 'facc_machine':
                return new RendererMachineFacc(x, y, this.viewType, direction)
            case 'manual_machine':
                return new RendererMachineManual(x, y, this.viewType, direction)
            case 'flux_machine':
                return new RendererMachineFlux(x, y, this.viewType, direction)
            case 'wave_machine':
                return new RendererMachineWave(x, y, this.viewType, direction)
            case 'carrier_machine':
                return new RendererMachineCarrier(
                    x,
                    y,
                    this.viewType,
                    direction
                )
            case 'ict_auto_machine':
                return new RendererMachineICT(x, y, this.viewType, direction)
            case 'insert_battery_machine':
                return new RendererMachineBattery(
                    x,
                    y,
                    this.viewType,
                    direction
                )
            case 'install_hs_machine':
                return new RendererMachineInstallHS(
                    x,
                    y,
                    this.viewType,
                    direction
                )
            case 'ft_cell_machine':
                return new RendererMachineFT(x, y, this.viewType, direction)
            case 'install_socket_machine':
                return new RendererMachineInstallSocket(
                    x,
                    y,
                    this.viewType,
                    direction
                )
            case 'cpu_assembly_machine':
                return new RendererMachineCPU(x, y, this.viewType, direction)
            case 'packing_j01_machine':
                return new RendererMachinePacking(
                    x,
                    y,
                    this.viewType,
                    direction
                )

            default:
                return new RendererMachineConveyor(
                    x,
                    y,
                    this.viewType,
                    'x1',
                    direction
                )
        }
    }
}
