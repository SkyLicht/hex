'use client'
import React from 'react'
import FactoryRenderer from '@/src/render_layout/components/factory/FactoryRenderer'
import { fileToFactoryRender } from '@/src/render_layout/mappers/file-to-factory-render'
import render_layout from '@/public/render/render_layout.json'

const FactoryRender4k = () => {
    return (
        <div className={'max-w-screen w-full h-full border-black border-2 p-4'}>
            {/*<AnimatedGraph/>*/}

            <FactoryRenderer
                factory={fileToFactoryRender(render_layout)}
                resolution={2160}
            />
        </div>
    )
}

export default FactoryRender4k
