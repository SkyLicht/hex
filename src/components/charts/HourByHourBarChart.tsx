import React from 'react'
import {
    Bar,
    BarChart,
    Cell,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
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

// const CustomTooltip = ({
//                            active,
//                            payload,
//                            label,
//                        }: TooltipProps<ValueType, NameType>) => {
//     if (active && payload && payload.length && new Date().getHours() >= label) {
//         return (
//             <div className="custom-tooltip  space-x-4 text-lg text-zinc-300 bg-secondary flex flex-row p-4 rounded-lg">
//                 <div>
//                     <p className="label">{transformIndexStringToHour(label)}</p>
//                     <p className="label">{`${"Smt In"}: ${payload[0].payload.smtIn}`}</p>
//                     <p className="label">{`${"Smt Out"}: ${
//                         payload[0].payload.smtOut
//                     }`}</p>
//                     <p className="label">{`${"Packing"}: ${
//                         payload[0].payload.packing
//                     }`}</p>
//
//                     <p className="label">{`${payload[1].name}: ${-(payload[1]
//                         .value as number)}`}</p>
//                 </div>
//                 <div></div>
//             </div>
//         );
//     } else {
//         return null;
//     }
// };

interface Props {
    uph: number
    chartData: {
        hour: number
        qy: number
    }[]
}
const HourByHourBarChart = ({ chartData, uph }: Props) => {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
            className={'select-none recharts-wrapper'}
        >
            <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="live_green" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="10%"
                            stopColor={'#84cc16'}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="90%"
                            stopColor={'#3f6212'}
                            stopOpacity={1}
                        />
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient id="live_red" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="10%"
                            stopColor={'#dc2626'}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="90%"
                            stopColor={'#7f1d1d'}
                            stopOpacity={1}
                        />
                    </linearGradient>
                </defs>

                <ReferenceLine
                    y={uph}
                    strokeDasharray="3 3"
                    stroke={'#d4d4d8'}
                    strokeWidth={2}
                ></ReferenceLine>

                <XAxis dataKey="hour" stroke={'#d4d4d8'} />
                <YAxis
                    hide={true}
                    domain={[
                        0,
                        chartData.reduce((m, c) => (c.qy > m ? c.qy : m), 0) *
                            1.2,
                    ]}
                />
                <Bar
                    stackId="a"
                    dataKey="qy"
                    fill="#8884d8"
                    radius={[12, 12, 12, 12]}
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
                    isAnimationActive={false}
                >
                    {chartData?.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={fillCell(entry.qy, uph)}
                        />
                    ))}
                </Bar>
            </BarChart>
            {/*<Bar dataKey="gap" stackId="a" fill="transparent" />*/}
        </ResponsiveContainer>
    )
}

const fillCell = (value: number, max: number) => {
    if (value < max) {
        return 'url(#live_red)'
    } else {
        return 'url(#live_green)'
    }
}

export default HourByHourBarChart
