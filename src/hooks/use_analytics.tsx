import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DeltasModel } from '@/src/types/hex_api'
import { ProcessDeltas } from '@/src/handlers/handle_deltas'

export const useGetDeltas = (line: string, group: string) => {
    return useQuery({
        queryKey: ['deltas'],
        queryFn: async () => {
            const { data, status } = await axios.get(
                `http://192.168.100.113:3010/api/v1/sfc_clon/getDeltasByGroupAndLine?group_name=${group}&line_name=${line}`
            )

            if (status !== 200) throw new Error('fdsghg')

            console.log(data)

            return {
                deltas: ProcessDeltas(data.listed_deltas as DeltasModel[]),
            }
        },
    })
}
