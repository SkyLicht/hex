import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { WorkPlanModel } from '@/src/types/hex_api'
import { work_url_hex_api } from '@/src/const/api'

//http://10.13.33.131:3010/api/v1/planner/get_work_plans_by_str_date?str_date=2025-08-11
export const useWorkPlan = () => {
    return useQuery({
        queryKey: ['work_plan-1'],
        queryFn: async () => {
            const response = await axios.get(
                `${work_url_hex_api}planner/get_work_plans_by_str_date?str_date=${'2025-08-11'}`
            )

            if (response.status !== 200) {
                throw new Error('Error getting the work plan')
            }

            return response.data as WorkPlanModel[]
        },
        refetchOnWindowFocus: true,
    })
}
