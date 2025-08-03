import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
import { RenderMeasures } from '@/src/render_layout/type/render/render-measures'
import { RenderRender } from '@/src/render_layout/type/render/render-render'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'

export interface LineRenderer {
    id: string
    label: string
    link: string
    dimensions: RenderMeasures
    measures: RenderMeasures
    render: RenderRender
    machines: Array<MachineRenderer>
    data_collectors: Array<DataCollectorRenderer>
}
