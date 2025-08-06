import RendererBanner from '@/src/render_layout/renderer/renderer-data-banners/renderer-banner'
import {
    ShapeAnchors,
    ShapeAnchorsType,
    ShapeDimensionsType,
} from '@/src/render_layout/type/shape/shape-type'

class RendererDataCollector extends RendererBanner {
    constructor(
        targetAnchors: ShapeAnchorsType,
        anchorPoints: { from: ShapeAnchors; to: ShapeAnchors },
        distance: number = 5 // Default distance
    ) {
        super()

        const dimensions = this.measureShape()
        this.measureContainer(targetAnchors, anchorPoints, distance, dimensions)
    }

    measureShape(): ShapeDimensionsType {
        return {
            width: 90,
            height: 50,
        }
    }
}

export default RendererDataCollector
