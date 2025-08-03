import { ProductionArea } from '@/src/render_layout/type/area-render'
import { LineRenderer } from '@/src/render_layout/type/line-render'

export interface FactoryRenderA6 {
    id: string
    areas: {
        production_area: ProductionArea
    }
    lines: Array<LineRenderer>
}
