import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { HBHModel } from '@/src/types/hbh_api_models'
import { work_url_hex_api } from '@/src/const/api'

interface HBHResponds {
    [key: string]: HBHModel[] // e.g., "J01_AOI_B2": { collected_timestamp: "...", ... }
}
export const useGetCurrentDayHBH = () => {
    return useQuery({
        queryKey: [`hbb_api-`],
        queryFn: async () => {
            const { data, status } = await axios.get(
                `${work_url_hex_api}hbh_api/get_current_day_records`
            )

            if (status !== 200) {
                throw new Error('Error getting the HBH')
            }

            return data as HBHResponds
        },
        refetchInterval: 100000,
    })
}
