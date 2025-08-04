import { RenderMeasures } from '@/src/render_layout/type/render/render-measures'
import { RenderMachineRender } from '@/src/render_layout/type/render/render-machine-render'

export interface MachineRenderer {
    id: string
    label: string
    dimensions: RenderMeasures
    measures: RenderMeasures
    render: RenderMachineRender
}
