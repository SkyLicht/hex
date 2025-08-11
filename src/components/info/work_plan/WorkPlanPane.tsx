import React from 'react'

interface Props {
    variant: string
    platform: string
    sku: string
    uph: number
    commit: number
}

function WorkPlanPane({ variant, sku, uph, commit, platform }: Props) {
    if (variant === 'header') {
        return (
            <div
                className={
                    'flex flex-row text-stone-300 font-sans font-bold text-2xl gap-4  items-center '
                }
            >
                <h3 className=" ">{platform}</h3>
                <h3 className="">{sku}</h3>
                <div className={'flex flex-row  gap-2  items-end'}>
                    <h3 className="text-xl">UPH</h3>
                    <h3 className="">{uph}</h3>
                </div>
                <div className={'flex flex-row  gap-2 items-end'}>
                    <h3 className=" text-xl">COMMIT</h3>
                    <h3 className=" ">{commit}</h3>
                </div>
            </div>
        )
    }
    return (
        <div className={'-flex flex-col text-stone-300'}>
            <h3 className="font-mono text-4xl ">100</h3>
            <h3 className="text-4xl">100</h3>
        </div>
    )
}

export default WorkPlanPane
