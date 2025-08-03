import { RenderMeasures } from '@/src/render_layout/type/render/render-measures'
import {
    ShapeAnchors,
    ShapePointType,
} from '@/src/render_layout/type/shape/shape-type'

export interface DataCollectorRenderer {
    id: string
    label: string
    collector_id: string
    link: string
    render: {
        from_anchor: ShapeAnchors
        to_anchor: ShapeAnchors
    }
    linked_line: {
        pointA: ShapePointType
        pointB: ShapePointType
    }
    dimensions: RenderMeasures
}
