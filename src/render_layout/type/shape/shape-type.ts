export type ShapePointType = {
    x: number
    y: number
}

export type ShapeDimensionsType = {
    width: number
    height: number
}

export type ShapeAnchorsType = {
    topLeft: ShapePointType
    topCenter: ShapePointType
    topRight: ShapePointType
    bottomLeft: ShapePointType
    bottomCenter: ShapePointType
    bottomRight: ShapePointType
    leftCenter: ShapePointType
    leftTop: ShapePointType
    leftBottom: ShapePointType
    rightCenter: ShapePointType
    rightTop: ShapePointType
    rightBottom: ShapePointType
    center: ShapePointType
}

export const emptyAnchors = {
    topLeft: { x: 0, y: 0 },
    topCenter: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
    bottomCenter: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 },
    leftCenter: { x: 0, y: 0 },
    leftTop: { x: 0, y: 0 },
    leftBottom: { x: 0, y: 0 },
    rightCenter: { x: 0, y: 0 },
    rightTop: { x: 0, y: 0 },
    rightBottom: { x: 0, y: 0 },
    center: { x: 0, y: 0 },
}

export type ShapeContainerType = {
    dimensions: ShapeDimensionsType
    position: {
        point: ShapePointType
        offSet: ShapePointType
    }
    anchors: ShapeAnchorsType
}

export enum ShapeAnchors {
    TOP_LEFT,
    TOP_CENTER,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_CENTER,
    BOTTOM_RIGHT,
    LEFT_CENTER,
    LEFT_TOP,
    LEFT_BOTTOM,
    RIGHT_TOP,
    RIGHT_BOTTOM,
    RIGHT_CENTER,
    CENTER,
}

export const getShapeAnchor = (anchor: string): ShapeAnchors => {
    switch (anchor) {
        case 'topLeft':
            return ShapeAnchors.TOP_LEFT
        case 'topCenter':
            return ShapeAnchors.TOP_CENTER
        case 'topRight':
            return ShapeAnchors.TOP_RIGHT
        case 'bottomLeft':
            return ShapeAnchors.BOTTOM_LEFT
        case 'bottomCenter':
            return ShapeAnchors.BOTTOM_CENTER
        case 'bottomRight':
            return ShapeAnchors.BOTTOM_RIGHT
        case 'leftCenter':
            return ShapeAnchors.LEFT_CENTER
        case 'rightCenter':
            return ShapeAnchors.RIGHT_CENTER
        case 'center':
            return ShapeAnchors.CENTER
        case 'leftTop':
            return ShapeAnchors.LEFT_TOP
        case 'leftBottom':
            return ShapeAnchors.LEFT_BOTTOM
        case 'rightTop':
            return ShapeAnchors.RIGHT_TOP
        case 'rightBottom':
            return ShapeAnchors.RIGHT_BOTTOM
        case 'top':
            return ShapeAnchors.TOP_CENTER
        case 'bottom':
            return ShapeAnchors.BOTTOM_CENTER
        case 'left':
            return ShapeAnchors.LEFT_CENTER
        case 'right':
            return ShapeAnchors.RIGHT_CENTER
        default:
            return ShapeAnchors.BOTTOM_CENTER
    }
}

export enum ShapeRender {
    RECTANGLE,
    CIRCLE,
}
