export interface PlatformModel {
    id: string
    platform: string
    sku: string
    uph: number
    cost: number
    width: number
    height: number
    components: number
    components_list_id: string
    f_n: number
    in_service: boolean
    created_at?: string
    updated_at?: string
}

export interface FactoryModel {
    id: string
    name: string
}

interface LineModel {
    id: string
    name: string
    description: string | null
    is_active: boolean
    factory_id: string
    created_at: string
    updated_at: string
    factory: FactoryModel
}

export interface WorkPlanModel {
    id: string
    platform_id: string
    line_id: string
    planned_hours: number
    target_oee: number
    uph_i: number
    start_hour: number
    end_hour: number
    str_date: string
    week: number
    head_count: number
    ft: number
    ict: number
    line: LineModel
    factory: string
    uph_meta: number
    commit: number
    commit_full: number
    created_at?: string
    updated_at?: string
    platform: PlatformModel
}

export interface DeltasModel {
    delta_minute: number
    delta_seconds: number
    from_ppid: string
    from_timestamp: string //"2025-08-12 14:30:22"
    hour_by_hour: number
    to_ppid: string
    to_timestamp: string //"2025-08-12 14:30:38"
}

export interface WipModel {
    ppid: string
    line_name: string
    next_station: string
    collected_timestamp: string
    station_name: string
    group_name: string
}
export interface UnitItem {
    ppid: string
    group_name: string
    timestamp: string
    line_name: string
}

export interface UnitsSummaryResponse {
    summary: number
    units: UnitItem[]
}
