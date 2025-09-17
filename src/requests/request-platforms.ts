import { PlatformDTO } from "../dto/planner_dto";
import { ServerUnreachableError } from "../http_utils";

export const getPlatformsInService = async (): Promise<PlatformDTO[]> => {
    'use server'
    const response = await fetch(
        `${process.env.HEX_API_IP}platform/get_all_in_service`
    )

    if (!response.ok) {
        throw new ServerUnreachableError('An unexpected error occurred')
    }
    if (response.status !== 200) {
        throw new Error('Error fetching platforms')
    }
    const row_data = await response.json()

    if (row_data) {
        return row_data as PlatformDTO[]
    }
    throw new Error('Error fetching platforms')

};
