// types/tab-config.ts
export interface TabConfig {
    key: string
    label: string
    component: React.ComponentType<{
        dataCollector: string
        groupName: string
        lineName: string
    }>
}

export type TabKey = 'deltas' | 'wip' | 'held_pcb'
