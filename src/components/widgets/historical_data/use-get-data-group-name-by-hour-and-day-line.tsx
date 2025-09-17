import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { work_url_hex_api, work_url_hex_api_local } from '@/src/const/api'
import { HistoricHourSummary } from '@/src/components/widgets/historical_data/historic_types'
import { UphRecordDTO } from '@/src/dto/planner_dto'

//sfc_clon/get_data_by_day_and_line?date=2025-08-21&line_name=J01
export const useGetDataGroupNameByHourAndDayLine = (
    date: string,
    line: string
) => {
    return useQuery({
        queryKey: [`historical_data-${date}-${line}`],
        queryFn: async () => {
            const { data, status, statusText } = await axios.get(
                `${work_url_hex_api}sfc_clon/get_data_by_day_and_line?date=${date}&line_name=${line}`
            )

            if (status !== 200) throw new Error(statusText, data)

            const response = await axios.get(
                `${work_url_hex_api_local}uph/get_all_by_line_name/${line}`
            )

            if (response.status !== 200) {
                throw new Error('Error getting the UPH by line name')
            }

            const uph = response.data as UphRecordDTO[]

            return { historical: data as HistoricHourSummary, uph }
        },
    })
}
