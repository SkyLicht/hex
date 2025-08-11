import React from 'react'
import {
    Bar,
    BarChart,
    Cell,
    ReferenceLine,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'
import { X } from 'lucide-react'

type PropsCustomLabel = {
    x: number
    y: number
    width: number
    stroke: string
    fill: string
    value: string
    index: number
}
const PackingLabel = ({
    x,
    y,
    stroke,
    fill,
    value,
    width,
    index,
}: PropsCustomLabel) => {
    if (value == '0') {
        return (
            <g>
                {new Date().getHours() > index ? (
                    <X size={width} x={x} y={y - width} color={'#d4d4d8'} />
                ) : null}
            </g>
        )
    }
    // only greater than 0
    return (
        <text
            x={x + width / 2}
            y={y}
            dy={-10}
            fill={fill}
            fontSize={18}
            textAnchor="middle"
            fontWeight="bold"
        >
            {value}
        </text>
    )
}

const dummy = [
    {
        dataCollector: 'INPUT1',
        qy: 3,
    },
    {
        dataCollector: 'SPI1',
        qy: 24,
    },
    {
        dataCollector: 'AOI1',
        qy: 13,
    },
    {
        dataCollector: 'REFLOW1',
        qy: 21,
    },
    {
        dataCollector: 'INPUT2',
        qy: 23,
    },
    {
        dataCollector: 'SPI2',
        qy: 5,
    },

    {
        dataCollector: 'REFLOW2',
        qy: 7,
    },
    {
        dataCollector: 'AOI2',
        qy: 23,
    },
    {
        dataCollector: 'PTH_INPUT',
        qy: 9,
    },
    {
        dataCollector: 'T_INSPECT',
        qy: 3,
    },
    {
        dataCollector: 'TOUCH_UP',
        qy: 24,
    },
    {
        dataCollector: 'ICT',
        qy: 13,
    },
    {
        dataCollector: 'FT',
        qy: 21,
    },
    {
        dataCollector: 'Final VI',
        qy: 23,
    },
    {
        dataCollector: 'Final IN',
        qy: 5,
    },
    {
        dataCollector: 'PACKING',
        qy: 23,
    },
]
const BarChartDeltasByStation = () => {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
            className={'select-none recharts-wrapper'}
        >
            <BarChart
                data={dummy}
                margin={{
                    top: 0,
                    right: 10,
                    left: 10,
                    bottom: 30,
                }}
            >
                <defs>
                    <linearGradient
                        id="electric_blue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="10%"
                            stopColor={'#0284c7'}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="90%"
                            stopColor={'#1e40af'}
                            stopOpacity={1}
                        />
                    </linearGradient>
                </defs>

                <ReferenceLine
                    y={96}
                    strokeDasharray="3 3"
                    stroke={'#d4d4d8'}
                    strokeWidth={2}
                ></ReferenceLine>

                <XAxis
                    dataKey="dataCollector"
                    stroke={'#d4d4d8'}
                    angle={-45}
                    tick={{ fontSize: 12 }}
                    textAnchor="end"

                    // label={{
                    //     value: 'Data Collector',
                    //     position: 'insideBottom',
                    //     offset: 0,
                    // }}
                />
                <YAxis hide={true} domain={[0, 40 * 1.2]} />
                <Bar
                    stackId="a"
                    dataKey="qy"
                    barSize={30}
                    fill="#8884d8"
                    label={(value) => (
                        <PackingLabel
                            stroke="#d4d4d8"
                            fill={'#d4d4d8'}
                            value={value.value}
                            x={value.x}
                            y={value.y}
                            width={value.width}
                            index={value.name}
                        />
                    )}
                >
                    {dummy?.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={'url(#electric_blue)'}
                        />
                    ))}
                </Bar>
            </BarChart>
            {/*<Bar dataKey="gap" stackId="a" fill="transparent" />*/}
        </ResponsiveContainer>
    )
}

export default BarChartDeltasByStation
