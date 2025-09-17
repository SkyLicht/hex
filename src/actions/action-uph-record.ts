'use server'
import { parseServerActionResponse } from '../http_utils'

//  POST http://10.13.32.220:3010/api/v1/uph/create_uph
//  Content-Type: application/json
//  {
//    "platform_id": "t1iwmdwlx3d0k7z",
//    "line_id": "lxL6Pz3KSOmnefj",
//    "target_oee": 0.6,
//    "uph": 100,
//    "start_date": "2025-09-13 14:10:00",
//    "end_date": "2025-09-13 19:00:00"
//  }
export const createUPHRecord = async (form: FormData) => {
    const { line_id, platform_id, target_oee, uph, start_date, end_date } =
        Object.fromEntries(Array.from(form))

    try {
        const record = {
            platform_id: platform_id,
            line_id: line_id,
            target_oee: target_oee,
            uph: uph,
            start_date: (start_date as string).replace('T', ' '),
            end_date: (end_date as string).replace('T', ' '),
        }

        const body = JSON.stringify(record)

        const response = await fetch(
            `${process.env.HEX_API_IP}uph/create_uph`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            }
        )

        const data = await response.json()

        // console.log('Response Data:', data)
        // console.log('Response Status:', response.status)

        if (!response.ok) {
            return parseServerActionResponse({
                error: response.statusText,
                status: 'ERROR',
            })
        }

        return parseServerActionResponse({ ...data, status: 'SUCCESS' })
    } catch (error) {
        console.error('Error creating UPH record:', error)
        return parseServerActionResponse({
            error: 'Server error',
            status: 'ERROR',
        })
    }
}

//DELETE http://localhost:3010/api/v1/uph/delete_uph/NDJSIKsqv9kmVHe
export const deleteUPHRecord = async (uph_id: string) => {
    try {
        const response = await fetch(
            `${process.env.HEX_API_IP}uph/delete_uph/${uph_id}`,
            {
                method: 'DELETE',
            }
        )

        const data = await response.json()

        if (!response.ok) {
            return parseServerActionResponse({
                error: response.statusText,
                status: 'ERROR',
            })
        }

        return parseServerActionResponse({ ...data, status: 'SUCCESS' })
    } catch (error) {
        console.error('Error deleting UPH record:', error)
        return parseServerActionResponse({
            error: 'Server error',
            status: 'ERROR',
        })
    }
}
