import {
    emptyAnchors,
    ShapeAnchorsType,
    ShapeContainerType,
    ShapeDimensionsType,
    ShapePointType,
} from '@/src/render_layout/type/shape/shape-type'

export class RendererMachineContainer {
    container: ShapeContainerType
    direction: string
    constructor(layout: ShapePointType, _direction: string) {
        this.container = this.createInitialShapeContainer(
            layout.x,
            layout.y,
            0,
            0
        )

        this.direction = _direction
    }

    createInitialShapeContainer(
        x: number = 0,
        y: number = 0,
        width: number = 0,
        height: number = 0
    ): ShapeContainerType {
        const point: ShapePointType = { x, y }
        const dimensions: ShapeDimensionsType = { width, height }
        const anchors: ShapeAnchorsType = emptyAnchors

        return {
            dimensions,
            position: {
                point,
                offSet: { x: 3, y: 0 },
            },
            anchors,
        }
    }

    measureContainer(dimensions: ShapeDimensionsType) {
        // Set dimensions
        this.container.dimensions = dimensions
        this.container.position.point.y -= dimensions.height / 2

        const { x, y } = this.container.position.point
        const { width, height } = this.container.dimensions
        // Calculate anchors based on position and dimensions
        this.container.anchors = {
            topLeft: { x, y },
            topCenter: { x: x + width / 2, y },
            topRight: { x: x + width, y },
            bottomLeft: { x, y: y + height },
            bottomCenter: { x: x + width / 2, y: y + height },
            bottomRight: { x: x + width, y: y + height },
            leftCenter: { x, y: y + height / 2 },
            rightCenter: { x: x + width, y: y + height / 2 },
            center: { x: x + width / 2, y: y + height / 2 },
            // not tested
            leftTop: { x, y },
            leftBottom: { x, y: y + height },
            rightTop: { x: x + width, y },
            rightBottom: { x: x + width, y: y + height },
        }
    }

    public measureShape() {}
}
