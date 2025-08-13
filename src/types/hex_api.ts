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
