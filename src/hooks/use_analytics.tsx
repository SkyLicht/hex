import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetDeltas = () => {
    return useQuery({
        queryKey: ['deltas'],
        queryFn: async () => {
            const { data, status } = await axios.get(
                `http://10.13.33.131:3010/api/v1/sfc_clon/getDeltasByGroupAndLine?group_name=PACKING&line_name=J01`
            )

            if (status !== 200) throw new Error('fdsghg')

            console.log(data)

            return {
                deltas: data.listed_deltas as {
                    delta_minute: number
                    delta_seconds: number
                    from_ppid: string
                    from_timestamp: string //"2025-08-12 14:30:22"
                    hour_by_hour: 14
                    to_ppid: string
                    to_timestamp: string //"2025-08-12 14:30:38"
                }[],
            }
        },
    })
}
