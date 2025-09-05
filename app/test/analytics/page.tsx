'use client'
import React from 'react'
import HistoricalDataContainer from '@/src/components/widgets/historical_data/HistoricalDataContainer'

const ManagerPage = () => {
    return (
        <div className={'h-full w-full'}>
            <HistoricalDataContainer onClose={() => {}} />
        </div>
    )
}

export default ManagerPage
