import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { work_url_hex_api } from '@/src/const/api'
import { HistoricHourSummary } from '@/src/components/widgets/historical_data/historic_types'

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

            return data as HistoricHourSummary
        },
    })
}
