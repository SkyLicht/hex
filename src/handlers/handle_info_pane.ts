import { HBHModel } from '@/src/types/hbh_api_models'
import { InfoPaneModel } from '@/src/types/info_pane_model'
import { WorkPlanModel } from '@/src/types/hex_api'

class HandleInfoPane {
    private work_plan: WorkPlanModel | undefined
    private line: string
    private hbh?: { [key: string]: HBHModel[] }
    constructor(
        line: string,
        hbh?: { [key: string]: HBHModel[] },
        wp?: WorkPlanModel
    ) {
        this.line = line
        this.hbh = hbh
        this.work_plan = wp
    }

    generateInfoPane(): InfoPaneModel {
        if (!this.work_plan)
            return {
                line: 'J01',
                current: 0,
                actual: 0,
                oee: 0,
                fpy: 0,
                chart_data: [],
                uph: 0,
                uph_i: 0,
                commit: 0,
            }

        if (!this.hbh)
            return {
                line: 'J01',
                current: 0,
                actual: 0,
                oee: 0,
                fpy: 0,
                chart_data: [],
                uph: 0,
                uph_i: 0,
                commit: 0,
            }

        const selected_data = this.hbh[this.line]

        if (!selected_data)
            return {
                line: 'J01',
                current: 0,
                actual: 0,
                oee: 0,
                fpy: 0,
                chart_data: [],
                uph: 0,
                uph_i: 0,
                commit: 0,
            }

        if (selected_data.length === 0)
            return {
                line: 'J01',
                current: 0,
                actual: 400,
                oee: 0,
                fpy: 0,
                chart_data: [],
                uph: 0,
                uph_i: 0,
                commit: 0,
            }

        const current_hour =
            selected_data[selected_data.length - 1]?.packing ?? 0
        const actual = selected_data.reduce(
            (acc, curr) => acc + curr.packing,
            0
        )

        const _to_chart = this.toHourlyChart(selected_data)
        const commit =
            // this.work_plan.platform.uph *
            // this.work_plan.target_oee *
            this.work_plan.uph_i * this.work_plan.planned_hours
        return {
            line: 'J01',
            current: current_hour,
            actual: actual,
            oee: 0,
            fpy: 0,
            chart_data: _to_chart,
            uph: this.work_plan.uph_i,
            uph_i: this.work_plan.uph_i,
            commit: commit,
        }
    }

    toHourlyChart(data: HBHModel[]): { hour: number; qy: number }[] {
        // accumulate total packing per hour
        const sumByHour = data.reduce((acc, d) => {
            acc.set(d.hour, (acc.get(d.hour) ?? 0) + d.packing)
            return acc
        }, new Map<number, number>())

        // build fixed 24-hour buckets with zero default
        return Array.from({ length: 24 }, (_, i) => {
            // const hour = i < 10 ? `0${i}` : `${i}`
            const qy = sumByHour.get(i) ?? 0
            return { hour: i, qy }
        })
    }
}

export default HandleInfoPane
