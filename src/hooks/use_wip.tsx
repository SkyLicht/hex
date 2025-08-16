import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { WipModel } from '@/src/types/hex_api'
import { work_url_hex_api } from '@/src/const/api'

export const useGetWIP = (line: string, group: string) => {
    return useQuery({
        queryKey: [`deltas-${line}-${group}`],
        queryFn: async () => {
            const { data, status, statusText } = await axios.get(
                `${work_url_hex_api}sfc_clon/get_wip_by_group_and_line?group_name=${group}&line_name=${line}`
            )

            if (status !== 200) throw new Error(statusText, data)

            if (data.length === 0) return []

            return data as WipModel[]
        },
    })
}
