export interface HistoricRecord {
    ppid: string
    collected_timestamp: string // e.g., "2025-08-20 06:21:02"
    model_name: string
    line_name: string
    group_name: string
    next_station: string
    error_flag: number
}

export interface HistoricStationHourSummary {
    count: number
    units_pass: number
    units_fail: number
    records: HistoricRecord[]
}

export interface HistoricStationGroupByStation {
    hour: number
    units_pass: number
    units_fail: number
}
export interface HistoricHourSummary {
    by_hour: Record<string, Record<string, HistoricStationHourSummary>>
    hours_by_group: Record<string, HistoricStationGroupByStation[]>
}
