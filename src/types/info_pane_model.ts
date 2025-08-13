export interface InfoPaneModel {
    line: string
    current: number
    actual: number
    oee: number
    fpy: number
    uph: number
    uph_i: number
    commit: number
    chart_data: { hour: number; qy: number }[]
}
