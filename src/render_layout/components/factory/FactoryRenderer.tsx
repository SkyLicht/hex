'use client'
import React, { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { useSearchParams } from 'next/navigation'
import { FactoryRenderA6 } from '@/src/render_layout/type/factory-render-a6'
import { LayoutRender } from '@/src/render_layout/renderer/layout-render'
import { FactoryLinesRenderer } from '@/src/render_layout/components/factory/FactoryLinesRenderer'
import {
    HourlySummaryData,
    LatestRecordSummaryData,
    WipSummaryData,
} from '@/src/hooks/use-data-collecotr-socket-v2'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'

interface FactoryRenderProps {
    factory: FactoryRenderA6
    resolution: number
    hourly: HourlySummaryData
    wip?: WipSummaryData
    last_record?: LatestRecordSummaryData
    onDataCollectorSelected: (collector: DataCollectorRenderer) => void
}

export const FactoryRenderer = ({
    factory,
    resolution,
    hourly,
    wip,
    last_record,
    onDataCollectorSelected,
}: FactoryRenderProps) => {
    const _render = useMemo(() => new LayoutRender(factory), [factory])
    const searchParams = useSearchParams()
    const selected_line = searchParams.get('selected_line')

    const svgRef = useRef<SVGSVGElement | null>(null)
    const gRef = useRef<SVGGElement | null>(null)
    const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null)

    useEffect(() => {
        if (!svgRef.current || !gRef.current) return

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 5])
            .on('zoom', (event) => {
                d3.select(gRef.current).attr('transform', event.transform)
            })

        zoomRef.current = zoom
        d3.select(svgRef.current).call(zoom)
    }, [])

    // Focus on selected line
    useEffect(() => {
        if (
            !svgRef.current ||
            !gRef.current ||
            !zoomRef.current ||
            !selected_line
        )
            return

        const selectedLineData = _render.factory.lines.find(
            (line) =>
                line.label === selected_line ||
                line.id.includes(selected_line.toLowerCase())
        )

        if (selectedLineData) {
            const svg = d3.select(svgRef.current)

            const screenX = selectedLineData.dimensions.x
            const screenY = selectedLineData.dimensions.y
            const lineWidth = selectedLineData.dimensions.width
            const lineHeight = selectedLineData.dimensions.height

            const centerX = screenX + lineWidth / 2
            const centerY = screenY + lineHeight / 2

            const svgWidth = resolution
            const svgHeight = lineHeight
            const scale = 1.0

            const translateX = svgWidth / 2 - centerX * scale
            const translateY = 70 + svgHeight / 2 - centerY * scale

            const transform = d3.zoomIdentity
                .translate(translateX, translateY)
                .scale(scale)

            svg.transition()
                .duration(1000)
                .ease(d3.easeCubicInOut)
                .call(zoomRef.current.transform, transform)
        }
    }, [selected_line, resolution, _render.factory.lines])

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${resolution} 400`}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMin meet"
            className="bg-transparent"
        >
            <g ref={gRef} key={'cd03a32f-9c7a-4d3d-ad84-aff64e4d5460'}>
                <FactoryLinesRenderer
                    key="cd03a32f-9c7a-4d3d-ad84-aff64e4d5457" // Add a stable key
                    lines={_render.factory.lines}
                    hourly_data={hourly || {}}
                    wip={wip || {}}
                    last_record={last_record || {}}
                    onDataCollectorSelected={onDataCollectorSelected}
                />
            </g>
        </svg>
    )
}
