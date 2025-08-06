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
                padding: { x: 3, y: 3 },
                offSet: { x: 0, y: 0 },
            },
            anchors,
        }
    }

    measureContainer(dimensions: ShapeDimensionsType) {
        // Set dimensions
        this.container.dimensions = dimensions

        switch (this.direction) {
            case 'top-right':
                this.container.position.point.x +=
                    this.container.position.padding.x
                this.container.position.point.y +=
                    this.container.position.padding.y
                break
            case 'left-top':
                this.container.position.point.y -=
                    dimensions.height +
                    dimensions.height / 2 +
                    this.container.position.padding.y
                this.container.position.point.x +=
                    this.container.position.padding.x

                break

            case 'left-bottom':
                this.container.position.point.y +=
                    this.container.position.padding.y + dimensions.height / 2
                this.container.position.point.x +=
                    this.container.position.padding.x
                break

            case 'bottom-right':
                this.container.position.point.x += 0
                this.container.position.point.y -= 0
                break
            case 'bottom':
                this.container.position.point.x -=
                    dimensions.width / 2 -
                    this.container.position.padding.x * 2 -
                    this.container.position.padding.x / 2
                break
            case 'top':
                this.container.position.point.y -= dimensions.height
                this.container.position.point.x -=
                    dimensions.width / 2 +
                    this.container.position.padding.x * 2 +
                    this.container.position.padding.x / 2

                break
            case 'right':
                this.container.position.point.y -=
                    dimensions.height / 2 + this.container.position.offSet.y
                break
            case 'left':
                this.container.position.point.y -= dimensions.height / 2
                this.container.position.point.x -= dimensions.width
                break
        }

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

    public getContainer(): ShapeContainerType {
        return this.container
    }
    public measureShape() {}
}
