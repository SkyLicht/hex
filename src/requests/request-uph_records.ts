import { UphRecordDTO } from '@/src/dto/dto-uph_record'
import { ServerUnreachableError } from '@/lib/sl-request'

export const getWorkPlan = async (): Promise<UphRecordDTO[]> => {
    'use server'

    // Wait 3 seconds
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    const response = await fetch(
        'http://10.13.32.220:3010/api/v1/uph/get_uph?page=1&page_size=20'
    )

    if (!response.ok) {
        throw new ServerUnreachableError('An unexpected error occurred')
    }

    if (response.status !== 200) {
        throw new Error('Error fetching lines')
    }

    const row_data = await response.json()

    if (row_data) {
        return row_data as UphRecordDTO[]
    }

    throw new Error('Error fetching lines')
}
