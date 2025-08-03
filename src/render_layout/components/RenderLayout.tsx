import React from 'react'
import FactoryRenderer from '@/src/render_layout/components/factory/FactoryRenderer'
import { fileToFactoryRender } from '@/src/render_layout/mappers/file-to-factory-render'
import render_layout from '@/public/render/render_layout.json'

const RenderLayout = () => {
    return (
        <div className={'max-w-screen-2xl w-full h-full border-black border-2'}>
            {/*<AnimatedGraph/>*/}

            <FactoryRenderer factory={fileToFactoryRender(render_layout)} />
        </div>
    )
}

export default RenderLayout
