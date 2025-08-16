import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DeltasModel } from '@/src/types/hex_api'
import { ProcessDeltas } from '@/src/handlers/handle_deltas'
import { work_url_hex_api } from '@/src/const/api'
import { PCBStatistics } from '@/src/types/pcb_held'

export const useGetDeltas = (line: string, group: string) => {
    return useQuery({
        queryKey: ['deltas'],
        queryFn: async () => {
            const { data, status, statusText } = await axios.get(
                `${work_url_hex_api}sfc_clon/getDeltasByGroupAndLine?group_name=${group}&line_name=${line}`
            )

            if (status !== 200) throw new Error(statusText, data)

            console.log(data)

            return {
                deltas: ProcessDeltas(data.listed_deltas as DeltasModel[]),
            }
        },
    })
}

//http://localhost:3010/api/v1/sfc_clon/get_production_hiding_patterns?line_name=J01&threshold_minutes=10
export const useGetProductionHidingPatterns = (
    line: string,
    threshold: number = 10
) => {
    return useQuery({
        queryKey: [`production_hiding_patterns-${line}-${threshold}`],
        queryFn: async () => {
            const { data, status, statusText } = await axios.get(
                `${work_url_hex_api}sfc_clon/get_production_hiding_patterns?line_name=${line}&threshold_minutes=${threshold}`
            )

            if (status !== 200) throw new Error(statusText, data)

            console.log(data)
            return data as PCBStatistics
        },
    })
}
