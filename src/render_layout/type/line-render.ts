import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
import { RenderMeasures } from '@/src/render_layout/type/render/render-measures'
import { RenderMachineRender } from '@/src/render_layout/type/render/render-machine-render'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'

export interface LineRenderer {
    id: string
    label: string
    link: string
    dimensions: RenderMeasures
    measures: RenderMeasures
    render: RenderLineRenderer
    machines: Array<MachineRenderer>
    data_collectors: Array<DataCollectorRenderer>
    groups: LineGroupRenderer[]
}

export interface RenderLineRenderer {
    type: string
    x: number
    y: number
    width: number
    height: number
}

export interface LineGroupRenderer {
    id: string
    index: number
    label: string
    banner_id: string
    range_form: number
    range_to: number
    type: string
    render: {
        x: number
        y: number
    }
}
