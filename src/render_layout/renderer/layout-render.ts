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
import { ShapeAnchors } from '@/src/render_layout/type/shape/shape-type'

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
        this.factory.lines.forEach((line) => {
            line.dimensions.width = this.resolution.width
            line.dimensions.height = 380
            line.dimensions.x = 0
            line.dimensions.y = 0

            this.measureMachines(line.machines, 10, 80)
            this.measureDataCollectors(line.data_collectors, line.machines)
        })
    }

    measureMachines(machine: MachineRenderer[], x: number, y: number) {
        let currentX = x
        let currentY = y

        machine.forEach((machine) => {
            const _renderer = this.mapMachine(
                machine.render.type,
                currentX,
                currentY
            )

            machine.dimensions.width = _renderer.container.dimensions.width
            machine.dimensions.height = _renderer.container.dimensions.height
            machine.dimensions.x = _renderer.container.position.point.x
            machine.dimensions.y = _renderer.container.position.point.y
            machine.dimensions.anchors = _renderer.container.anchors

            currentX +=
                _renderer.container.dimensions.width +
                _renderer.container.position.offSet.x
        })
    }

    measureDataCollectors(
        collectors: DataCollectorRenderer[],
        machines: MachineRenderer[]
    ) {
        collectors.forEach((_dc) => {
            const _machine = this.findMachine(_dc.link, machines)
            if (!_machine) return

            console.log(_machine)

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
        y: number
    ): RendererMachineContainer {
        switch (machineStr) {
            case 'loader_machine':
                return new RendererMachineLoader(x, y, this.viewType)
            case 'conveyor_x1_machine':
                return new RendererMachineConveyor(x, y, this.viewType, 'x1')
            case 'conveyor_x2_machine':
                return new RendererMachineConveyor(x, y, this.viewType, 'x2')
            case 'conveyor_x3_machine':
                return new RendererMachineConveyor(x, y, this.viewType, 'x3')
            case 'conveyor_x5_machine':
                return new RendererMachineConveyor(x, y, this.viewType, 'x5')
            case 'gkg_machine':
                return new RendererMachineGKG(x, y, this.viewType)
            case 'spi_machine':
                return new RendererMachineSPI(x, y, this.viewType)
            case 'buffer_machine':
                return new RendererMachineBufferNg(x, y, this.viewType)
            case 'shuttle_machine':
                return new RendererMachineShuttle(x, y, this.viewType)
            case 'npm_machine':
                return new RendererMachineNPM(x, y, this.viewType)
            case 'sliding_machine':
                return new RendererMachineSliding(x, y, this.viewType)
            case 'fuzion_machine':
                return new RendererMachineFuzion(x, y, this.viewType)
            case 'aoi_machine':
                return new RendererMachineAoi(x, y, this.viewType)
            case 'reflow_machine':
                return new RendererMachineReflow(x, y, this.viewType)
            case 'insert_machine':
                return new RendererMachineInsert(x, y, this.viewType)
            case 'remove_machine':
                return new RendererMachineInsert(x, y, this.viewType)
            case 'rotator_machine':
                return new RendererMachineInsert(x, y, this.viewType)
            default:
                return new RendererMachineConveyor(x, y, this.viewType, 'x1')
        }
    }
}
