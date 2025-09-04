import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { UnitsSummaryResponse, WipModel } from '@/src/types/hex_api'
import { work_url_hex_api } from '@/src/const/api'

export const useGetWIP = (line: string, group: string) => {
    return useQuery({
        queryKey: [`deltas-${line}-${group}`],
        queryFn: async () => {
            console.log(
                `${work_url_hex_api}sfc_clon/get_wip_by_group_and_line?group_name=${group}&line_name=${line}`
            )
            const { data, status, statusText } = await axios.get(
                `${work_url_hex_api}sfc_clon/get_wip_by_group_and_line?group_name=${group}&line_name=${line}`
            )

            if (status !== 200) throw new Error(statusText, data)

            if (data.length === 0) return []

            return data as WipModel[]
        },
    })
}

//GET http://10.13.33.131:3010/api/v1/sfc_clon/get_wip_by_hour?date=2025-08-22&hour=2&line_name=J01&group_name_a=FINAL_INSPECT&group_name_b=PACKING
export const useGetWIPByHour = (
    date: string,
    hour: number,
    line: string,
    group_a: string,
    group_b: string
) => {
    console.log(date, hour, line, group_a, group_b)
    return useQuery({
        queryKey: [`wip-hour-${date}-${hour}-${line}-${group_a}-${group_b}`],
        queryFn: async () => {
            const { data, status, statusText } = await axios.get(
                `${work_url_hex_api}sfc_clon/get_wip_by_hour?date=${date}&hour=${hour}&line_name=${line}&group_name_a=${group_a}&group_name_b=${group_b}`
            )

            if (status !== 200) throw new Error(statusText, data)

            return data as UnitsSummaryResponse
        },
    })
}
