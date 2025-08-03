import React from 'react'
import { ShapeAnchorsType } from '@/src/render_layout/type/shape/shape-type'

interface Props {
    anchors: ShapeAnchorsType
}

const RenderContainerAnchors = ({ anchors }: Props) => {
    const {
        bottomCenter,
        center,
        bottomRight,
        leftCenter,
        topCenter,
        rightCenter,
        topRight,
        topLeft,
        bottomLeft,
    } = anchors

    return (
        <g>
            <circle cx={center.x} cy={center.y} r={2} fill="#fff" />
            <circle cx={topLeft.x} cy={topLeft.y} r={2} fill="#fff" />
            <circle cx={topCenter.x} cy={topCenter.y} r={2} fill="#fff" />
            <circle cx={topRight.x} cy={topRight.y} r={2} fill="#fff" />
            <circle cx={rightCenter.x} cy={rightCenter.y} r={2} fill="#fff" />
            <circle cx={bottomRight.x} cy={bottomRight.y} r={2} fill="#fff" />
            <circle cx={bottomCenter.x} cy={bottomCenter.y} r={2} fill="#fff" />
            <circle cx={bottomLeft.x} cy={bottomLeft.y} r={2} fill="#fff" />
            <circle cx={leftCenter.x} cy={leftCenter.y} r={2} fill="#fff" />
        </g>
    )
}

export default RenderContainerAnchors
