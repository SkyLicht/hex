import React from 'react'
import { TrendingDown } from 'lucide-react'

const ProductionLineMetrics = () => {
    return (
        <div
            className={
                'h-full flex flex-col justify-between  font-sans text-xl font-bold text-stone-300 g'
            }
        >
            <div className={'flex flex-col '}>
                <h3> Current</h3>
                <div className={'flex flex-row gap-3 items-end'}>
                    <h3 className={'text-5xl text-stone-400'}>234</h3>
                    <TrendingDown size={32} color={'red'} />
                </div>
            </div>
            <div className={'flex flex-col '}>
                <h3> Total</h3>
                <div className={'flex flex-row gap-3 items-end'}>
                    <h3 className={'text-4xl text-stone-400'}> 5768</h3>
                    <TrendingDown size={32} color={'red'} />
                </div>
            </div>

            <div className={'flex flex-row justify-between pr-4'}>
                <div className={'flex flex-col '}>
                    <h3> OEE</h3>

                    <h3 className={'text-3xl text-stone-400'}> 24%</h3>
                </div>

                <div className={'flex flex-col '}>
                    <h3> FPY</h3>

                    <h3 className={'text-3xl text-stone-400'}> 94%</h3>
                </div>
            </div>
        </div>
    )
}

export default ProductionLineMetrics
