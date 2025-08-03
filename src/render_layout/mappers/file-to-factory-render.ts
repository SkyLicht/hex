import { ProductionArea } from '@/src/render_layout/type/area-render'
import { FactoryRenderA6 } from '@/src/render_layout/type/factory-render-a6'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'
import { LineRenderer } from '@/src/render_layout/type/line-render'
import { DataCollectorRenderer } from '@/src/render_layout/type/data-collector-renderer'
import {
    emptyAnchors,
    getShapeAnchor,
    ShapeAnchors,
} from '@/src/render_layout/type/shape/shape-type'

export function fileToFactoryRender(file): FactoryRenderA6 {
    const areas = file.areas
    if (!areas) throw new Error('No areas found')

    const { production_area } = areas

    const production_area_render: ProductionArea = {
        id: production_area.id,
        label: production_area.label,
        render: {
            type: production_area.render.type,
        },
        dimensions: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            anchors: emptyAnchors,
        },
        measures: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            anchors: emptyAnchors,
        },
        lines: [],
    }

    const production_lines_render: LineRenderer[] = []

    file.lines.forEach((_l) => {
        const file_machines = _l.machines
        if (!file_machines) throw new Error('No machines found')
        const machines_render: MachineRenderer[] = file_machines.map(
            (machine) => {
                return {
                    id: machine.id,
                    label: machine.label,
                    owner: machine.owner,
                    dimensions: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    },
                    measures: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    },
                    render: {
                        type: machine.render.type,
                    },
                }
            }
        )
        const data_collectors = _l.data_collector
        if (!data_collectors) throw new Error('Data collectors not supported')
        const data_collectors_render: DataCollectorRenderer[] =
            data_collectors.map((dc) => {
                return {
                    id: dc.id,
                    label: dc.label,
                    collector_id: dc.collector_id,
                    link: dc.link,
                    render: {
                        from_anchor: getShapeAnchor(dc.render.from_anchor),
                        to_anchor: getShapeAnchor(dc.render.to_anchor),
                    },
                    dimensions: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                        anchors: emptyAnchors,
                    },
                }
            })

        production_lines_render.push({
            id: _l.id,
            label: _l.label,
            link: _l.link,
            dimensions: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                anchors: emptyAnchors,
            },
            measures: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                anchors: emptyAnchors,
            },
            render: {
                type: _l.render.type,
            },
            machines: machines_render,
            data_collectors: data_collectors_render,
        })
    })

    return {
        id: file.id,
        areas: {
            production_area: production_area_render,
        },
        lines: production_lines_render,
    }
}
