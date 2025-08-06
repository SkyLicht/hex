'use client'
import React, { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import FactoryAreaRenderer from '@/src/render_layout/components/factory/FactoryAreaRenderer'
import { FactoryRenderA6 } from '@/src/render_layout/type/factory-render-a6'
import { LayoutRender } from '@/src/render_layout/renderer/layout-render'
import { FactoryLinesRenderer } from '@/src/render_layout/components/factory/FactoryLinesRenderer'

interface FactoryRenderProps {
    factory: FactoryRenderA6
    resolution: number
}
//1536 // 1920 // 2160
const FactoryRenderer = ({ factory, resolution }: FactoryRenderProps) => {
    const _render = useMemo(() => new LayoutRender(factory), [factory])

    const svgRef = useRef<SVGSVGElement | null>(null)
    const gRef = useRef<SVGGElement | null>(null)

    useEffect(() => {
        if (!svgRef.current || !gRef.current) return

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 5]) // min/max zoom
            .on('zoom', (event) => {
                d3.select(gRef.current).attr('transform', event.transform)
            })

        d3.select(svgRef.current).call(zoom) // as any to fix TS issues
    }, [])

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${resolution} 384`}
            width="100%"
            height="100% "
            preserveAspectRatio="xMidYMin  meet"
            className=" bg-transparent"
        >
            <g ref={gRef}>
                {/* Static background */}
                {/*<rect*/}
                {/*    x={0}*/}
                {/*    y={0}*/}
                {/*    width={1536}*/}
                {/*    height={384}*/}
                {/*    fill="#f8fafc"*/}
                {/*    stroke="#ccc"*/}
                {/*/>*/}
                {/*Render Production Area*/}
                {/*<FactoryAreaRenderer*/}
                {/*    dimension={factory.areas.production_area.dimensions}*/}
                {/*/>*/}

                {/* Machines */}
                <FactoryLinesRenderer lines={_render.factory.lines} />

                {/*Data Collectors*/}
            </g>
        </svg>
    )
}

export default FactoryRenderer
