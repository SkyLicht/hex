import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { WorkPlanModel } from '@/src/types/hex_api'
import { work_url_hex_api, work_url_hex_api_local } from '@/src/const/api'
import { UphRecordDTO } from '@/src/dto/planner_dto'

//http://10.13.33.131:3010/api/v1/planner/get_work_plans_by_str_date?str_date=2025-08-11
export const useWorkPlan = () => {
    return useQuery({
        queryKey: ['work_plan-1'],
        queryFn: async () => {
            const response = await axios.get(
                `${work_url_hex_api}planner/get_work_plans_by_str_date?str_date=${'2025-09-12'}`
            )

            if (response.status !== 200) {
                throw new Error('Error getting the work plan')
            }

            if (response.data.data === null)
                throw new Error(response.data.message as string)

            return response.data as WorkPlanModel[]
        },
        refetchOnWindowFocus: true,
    })
}

export const useGetLastUPH = () => {
    return useQuery({
        queryKey: ['last_uph-2'],
        queryFn: async () => {
            const response = await axios.get(
                `${work_url_hex_api_local}uph/get_unique`
            )

            console.log(response)

            if (response.status !== 200) {
                throw new Error('Error getting the last UPH')
            }

            return response.data as UphRecordDTO[]
        },
    })
}

export const useGetUPHbyLineName = (line: string) => {
    return useQuery({
        queryKey: [`uph_by_line_name-${line}`],
        queryFn: async () => {
            console.log('getting uph by line name')
            const response = await axios.get(
                `${work_url_hex_api_local}uph/get_all_by_line_name/${line}`
            )

            if (response.status !== 200) {
                throw new Error('Error getting the UPH by line name')
            }

            return response.data as UphRecordDTO[]
        },
    })
}
