import React from 'react'
import { MachineRenderer } from '@/src/render_layout/type/machine-renderer'

interface Props {
    machine: MachineRenderer
}

const MachineSlidingRenderer = ({ machine }: Props) => {
    if (machine.render.direction === 'top')
        return (
            <g
                transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y + machine.dimensions.height / 2})`}
            >
                <rect
                    width={machine.dimensions.width}
                    height={machine.dimensions.height / 2}
                    x={0}
                    y={0}
                    fill={'var(--machine-default-color)'}
                />

                <line
                    x1={4}
                    y1={4}
                    x2={4}
                    y2={-machine.dimensions.height / 2}
                    stroke={'var(--machine-default-color)'}
                    strokeWidth={2}
                />

                <line
                    x1={machine.dimensions.width - 4}
                    y1={4}
                    x2={machine.dimensions.width - 4}
                    y2={-machine.dimensions.height / 2}
                    stroke={'var(--machine-default-color)'}
                    strokeWidth={2}
                />
            </g>
        )

    if (machine.render.direction === 'bottom') {
        return (
            <g
                transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
            >
                <rect
                    width={machine.dimensions.width}
                    height={machine.dimensions.height / 2}
                    x={0}
                    y={machine.dimensions.height / 2}
                    fill={'var(--machine-default-color)'}
                />

                <line
                    x1={4}
                    y1={0}
                    x2={4}
                    y2={machine.dimensions.height / 2}
                    stroke={'var(--machine-default-color)'}
                    strokeWidth={2}
                />

                <line
                    x1={machine.dimensions.width - 4}
                    y1={0}
                    x2={machine.dimensions.width - 4}
                    y2={machine.dimensions.height / 2}
                    stroke={'var(--machine-default-color)'}
                    strokeWidth={2}
                />
            </g>
        )
    }

    if (machine.render.direction === 'left') {
        return (
            <g
                transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
            >
                <rect
                    width={machine.dimensions.width / 2}
                    x={machine.dimensions.width / 2}
                    height={machine.dimensions.height}
                    fill={'var(--machine-default-color)'}
                />

                <line
                    x1={0}
                    y1={4}
                    x2={machine.dimensions.width / 2}
                    y2={4}
                    stroke={'var(--machine-default-color)'}
                    strokeWidth={2}
                />

                <line
                    x1={0}
                    y1={machine.dimensions.height - 4}
                    x2={machine.dimensions.width / 2}
                    y2={machine.dimensions.height - 4}
                    stroke={'var(--machine-default-color)'}
                    strokeWidth={2}
                />
            </g>
        )
    }

    return (
        <g
            transform={`translate(${machine.dimensions.x}, ${machine.dimensions.y})`}
        >
            <rect
                width={machine.dimensions.width / 2}
                height={machine.dimensions.height}
                fill={'var(--machine-default-color)'}
            />

            <line
                x1={machine.dimensions.width}
                y1={4}
                x2={machine.dimensions.width / 2}
                y2={4}
                stroke={'var(--machine-default-color)'}
                strokeWidth={2}
            />

            <line
                x1={machine.dimensions.width}
                y1={machine.dimensions.height - 4}
                x2={machine.dimensions.width / 2}
                y2={machine.dimensions.height - 4}
                stroke={'var(--machine-default-color)'}
                strokeWidth={2}
            />
            {/*<line*/}
            {/*    x1={machine.dimensions.width / 2}*/}
            {/*    y1={machine.dimensions.height + 8}*/}
            {/*    x2={machine.dimensions.width / 2}*/}
            {/*    y2={-machine.dimensions.height + 12}*/}
            {/*    stroke={'var(--machine-default-color)'}*/}
            {/*    strokeWidth={2}*/}
            {/*/>*/}
        </g>
    )
}

export default MachineSlidingRenderer
