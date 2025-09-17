import { LineDTO } from "../dto/planner_dto";
import { ServerUnreachableError } from "../http_utils";


export const getLines = async (): Promise<LineDTO[]> => {
    'use server'
    const response = await fetch(
        `${process.env.HEX_API_IP}layout/get_lines`
    )

    if (!response.ok) {
        throw new ServerUnreachableError('An unexpected error occurred')
    }
    if (response.status !== 200) {
        throw new Error('Error fetching lines')
    }
    const row_data = await response.json()

    if (row_data) {
        return row_data as LineDTO[]
    }
    throw new Error('Error fetching lines')

};
