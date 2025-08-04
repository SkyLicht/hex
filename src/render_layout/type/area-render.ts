import { RenderMachineRender } from '@/src/render_layout/type/render/render-machine-render'
import { RenderMeasures } from '@/src/render_layout/type/render/render-measures'
import { LineRenderer } from '@/src/render_layout/type/line-render'

export interface AreaRender {
    id: string
    label: string
    dimensions: RenderMeasures
    measures: RenderMeasures
    render: RenderMachineRender
}

export interface ProductionArea {
    id: string
    label: string
    dimensions: RenderMeasures
    measures: RenderMeasures
    render: RenderMachineRender
    lines: LineRenderer[]
}
