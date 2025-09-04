// components/DataCollectorTabs.tsx
'use client'
import React, { useState } from 'react'
import { TabConfig, TabKey } from '@/src/types/tab-config'

import DataCollectorWip from '@/src/components/widgets/line_metrics/DataCollectorWIP'
import DataCollectorHeldPCB from '@/src/components/widgets/line_metrics/DataCollectorHeldPCB'
import DataCollectorDeltasV3 from '@/src/components/widgets/line_metrics/DataCollectorDeltasV3'
import { XIcon } from 'lucide-react'

interface DataCollectorTabsProps {
    dataCollector: string
    groupName: string
    lineName: string
    onClose: () => void
}

// Tab configuration - easily extensible
const TAB_CONFIGS: Record<TabKey, TabConfig> = {
    deltas: {
        key: 'deltas',
        label: 'Deltas',
        component: DataCollectorDeltasV3,
    },
    wip: {
        key: 'wip',
        label: 'WIP',
        component: DataCollectorWip,
    },
    // held_pcb: {
    //     key: 'held_pcb',
    //     label: 'Held PCBs',
    //     component: DataCollectorHeldPCB,
    // },
}

const DataCollectorTabs = ({
    dataCollector,
    lineName,
    groupName,
    onClose,
}: DataCollectorTabsProps) => {
    const [activeTab, setActiveTab] = useState<TabKey>('deltas')

    const tabs = Object.values(TAB_CONFIGS)
    const ActiveComponent = TAB_CONFIGS[activeTab].component

    return (
        <div className="w-full h-full flex flex-col">
            {/* Tab Headers */}
            <div className={'flex flex-row justify-between items-center'}>
                <div className="flex ">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as TabKey)}
                            className={`px-2  text-sm font-medium transition-colors cursor-pointer ${
                                activeTab === tab.key
                                    ? 'border-b-2 border-blue-100 text-blue-200'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <XIcon className={'w-6 h-6 cursor-pointer'} onClick={onClose} />
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
                <ActiveComponent
                    dataCollector={dataCollector}
                    lineName={lineName}
                    groupName={groupName}
                />
            </div>
        </div>
    )
}

export default DataCollectorTabs
