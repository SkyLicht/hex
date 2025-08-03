import { RenderMeasures } from '@/src/render_layout/type/render/render-measures'
import { RenderRender } from '@/src/render_layout/type/render/render-render'

export interface MachineRenderer {
    id: string
    label: string
    dimensions: RenderMeasures
    measures: RenderMeasures
    render: RenderRender
}
