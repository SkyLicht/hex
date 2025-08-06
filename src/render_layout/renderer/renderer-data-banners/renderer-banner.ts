import {
    emptyAnchors,
    ShapeAnchors,
    ShapeAnchorsType,
    ShapeContainerType,
    ShapeDimensionsType,
    ShapePointType,
} from '../../type/shape/shape-type'

class RendererBanner {
    container: ShapeContainerType
    linked_line: {
        pointA: ShapePointType
        pointB: ShapePointType
    }

    constructor() {
        this.linked_line = {
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
        }
        this.container = {
            dimensions: { width: 0, height: 0 },
            anchors: emptyAnchors,
            position: {
                point: { x: 0, y: 0 },
                offSet: { x: 0, y: 0 },
                padding: { x: 0, y: 0 },
            },
        }
    }

    measureContainer(
        targetAnchors: ShapeAnchorsType,
        anchorPoints: { from: ShapeAnchors; to: ShapeAnchors },
        distance: number,
        dimensions: ShapeDimensionsType
    ) {
        // 1. Set banner dimensions
        this.container.dimensions = dimensions

        // 2. Calculate initial banner position based on machine anchor and distance
        const machineAnchorPoint = this.getAnchorPoint(
            anchorPoints.from,
            targetAnchors
        )
        const initialBannerPosition = this.calculateBannerPosition(
            machineAnchorPoint,
            anchorPoints.from,
            distance
        )

        // 3. Position banner and calculate final position based on banner anchor alignment
        this.container.position.point = this.adjustBannerPosition(
            initialBannerPosition,
            anchorPoints.to
        )

        // 4. Calculate all banner anchors
        this.recalculateAnchors()

        // 5. Set final connection line points
        this.linked_line.pointA = machineAnchorPoint
        this.linked_line.pointB = this.getAnchorPoint(
            anchorPoints.to,
            this.container.anchors
        )
    }

    private getAnchorPoint(
        anchor: ShapeAnchors,
        anchors: ShapeAnchorsType
    ): ShapePointType {
        // Safety check for undefined anchors
        if (!anchors) {
            console.warn('Anchors are undefined, returning default point')
            return { x: 0, y: 0 }
        }

        const anchorMap = {
            [ShapeAnchors.TOP_LEFT]: anchors.topLeft,
            [ShapeAnchors.TOP_CENTER]: anchors.topCenter,
            [ShapeAnchors.TOP_RIGHT]: anchors.topRight,
            [ShapeAnchors.BOTTOM_LEFT]: anchors.bottomLeft,
            [ShapeAnchors.BOTTOM_CENTER]: anchors.bottomCenter,
            [ShapeAnchors.BOTTOM_RIGHT]: anchors.bottomRight,
            [ShapeAnchors.LEFT_CENTER]: anchors.leftCenter,
            [ShapeAnchors.LEFT_TOP]: anchors.leftTop,
            [ShapeAnchors.LEFT_BOTTOM]: anchors.leftBottom,
            [ShapeAnchors.RIGHT_CENTER]: anchors.rightCenter,
            [ShapeAnchors.RIGHT_TOP]: anchors.rightTop,
            [ShapeAnchors.RIGHT_BOTTOM]: anchors.rightBottom,
            [ShapeAnchors.CENTER]: anchors.center,
        }
        return anchorMap[anchor] || anchors.bottomCenter
    }

    private calculateBannerPosition(
        machineAnchor: ShapePointType,
        machineAnchorType: ShapeAnchors,
        distance: number
    ): ShapePointType {
        const position = { ...machineAnchor }

        // Calculate banner position based on machine anchor direction
        if (this.isTopAnchor(machineAnchorType)) {
            position.y -= distance // Banner above machine
        } else if (this.isBottomAnchor(machineAnchorType)) {
            position.y += distance // Banner below machine
        } else if (this.isLeftAnchor(machineAnchorType)) {
            position.x -= distance // Banner left of machine
        } else if (this.isRightAnchor(machineAnchorType)) {
            position.x += distance // Banner right of machine
        } else {
            position.y -= distance // Default: above
        }

        return position
    }

    private adjustBannerPosition(
        initialPosition: ShapePointType,
        bannerAnchor: ShapeAnchors
    ): ShapePointType {
        const { width, height } = this.container.dimensions
        const adjustedPosition = { ...initialPosition }

        // Adjust position so the specified banner anchor aligns with the calculated position
        switch (bannerAnchor) {
            case ShapeAnchors.TOP_LEFT:
                // No adjustment needed - top-left is the default reference point
                break
            case ShapeAnchors.TOP_CENTER:
                adjustedPosition.x -= width / 2
                break
            case ShapeAnchors.TOP_RIGHT:
                adjustedPosition.x -= width
                break
            case ShapeAnchors.BOTTOM_LEFT:
                adjustedPosition.y -= height
                break
            case ShapeAnchors.BOTTOM_CENTER:
                adjustedPosition.x -= width / 2
                adjustedPosition.y -= height
                break
            case ShapeAnchors.BOTTOM_RIGHT:
                adjustedPosition.x -= width
                adjustedPosition.y -= height
                break
            case ShapeAnchors.LEFT_CENTER:
                adjustedPosition.y -= height / 2
                break
            case ShapeAnchors.LEFT_TOP:
                // No adjustment needed for left-top
                break
            case ShapeAnchors.LEFT_BOTTOM:
                adjustedPosition.y -= height
                break
            case ShapeAnchors.RIGHT_CENTER:
                adjustedPosition.x -= width
                adjustedPosition.y -= height / 2
                break
            case ShapeAnchors.RIGHT_TOP:
                adjustedPosition.x -= width
                break
            case ShapeAnchors.RIGHT_BOTTOM:
                adjustedPosition.x -= width
                adjustedPosition.y -= height
                break
            case ShapeAnchors.CENTER:
                adjustedPosition.x -= width / 2
                adjustedPosition.y -= height / 2
                break
        }

        return adjustedPosition
    }

    private recalculateAnchors() {
        const { x, y } = this.container.position.point
        const { width, height } = this.container.dimensions

        this.container.anchors = {
            topLeft: { x, y },
            topCenter: { x: x + width / 2, y },
            topRight: { x: x + width, y },
            bottomLeft: { x, y: y + height },
            bottomCenter: { x: x + width / 2, y: y + height },
            bottomRight: { x: x + width, y: y + height },
            leftCenter: { x, y: y + height / 2 },
            leftTop: { x, y },
            leftBottom: { x, y: y + height },
            rightCenter: { x: x + width, y: y + height / 2 },
            rightTop: { x: x + width, y },
            rightBottom: { x: x + width, y: y + height },
            center: { x: x + width / 2, y: y + height / 2 },
        }
    }

    private isTopAnchor(anchor: ShapeAnchors): boolean {
        return [
            ShapeAnchors.TOP_LEFT,
            ShapeAnchors.TOP_CENTER,
            ShapeAnchors.TOP_RIGHT,
        ].includes(anchor)
    }

    private isBottomAnchor(anchor: ShapeAnchors): boolean {
        return [
            ShapeAnchors.BOTTOM_LEFT,
            ShapeAnchors.BOTTOM_CENTER,
            ShapeAnchors.BOTTOM_RIGHT,
        ].includes(anchor)
    }

    private isLeftAnchor(anchor: ShapeAnchors): boolean {
        return [
            ShapeAnchors.LEFT_CENTER,
            ShapeAnchors.LEFT_TOP,
            ShapeAnchors.LEFT_BOTTOM,
        ].includes(anchor)
    }

    private isRightAnchor(anchor: ShapeAnchors): boolean {
        return [
            ShapeAnchors.RIGHT_CENTER,
            ShapeAnchors.RIGHT_TOP,
            ShapeAnchors.RIGHT_BOTTOM,
        ].includes(anchor)
    }
}

export default RendererBanner
