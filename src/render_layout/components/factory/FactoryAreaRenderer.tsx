import React from 'react'
import { RenderMeasures } from '@/src/render_layout/type/render/render-measures'

interface Props {
    dimension: RenderMeasures
}
const FactoryAreaRenderer = ({ dimension }: Props) => {
    const { x, y, width, height } = dimension
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#f8fafc"
                stroke="#ccc"
            />
        </g>
    )
}

export default FactoryAreaRenderer
