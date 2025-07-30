import {responseHandler, ServerUnreachableError} from "@/lib/sl-request";
import {HEX_CREATE_ROUTE} from "@/hook/refers";
import {PPIDModel} from "@/types/statistics-models";



// Using your existing HEX_CREATE_ROUTE pattern
const API_BASE_URL = HEX_CREATE_ROUTE("ppid"); // Adjust the route name as needed

export const getPPIDByLineAndGroupAndDateHour = async (
    date: string,
    hour: string,
    group_name: string,
    line_name: string
): Promise<PPIDModel[]> => {
    "use server";

    const url = `${API_BASE_URL}/get_ppid_by_date_hour_and_group_name?date=${encodeURIComponent(date)}&hour=${encodeURIComponent(hour)}&group_name=${encodeURIComponent(group_name)}&line_name=${encodeURIComponent(line_name)}`;

    const response = await fetch(url, {
        cache: "no-cache", // Real-time data shouldn't be cached
    }).catch((error) => {
        throw new ServerUnreachableError("An unexpected error occurred", error);
    });

    return await responseHandler(response, url);
};
export const getCurrentHourPPIDByLineAndGroupLocal = async (
    group_name: string,
    line_name: string
): Promise<PPIDModel[]> => {
    "use server";

    // Get current local time
    const now = new Date();

    // Format date as YYYY-MM-DD (local time)
    const date = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0');

    // Format hour as HH:00:00 (local time)
    const hour = String(now.getHours()).padStart(2, '0') + ':00:00';

    const API_BASE_URL = HEX_CREATE_ROUTE("ppid"); // Adjust the route name as needed

    const url = `${API_BASE_URL}/get_ppid_by_date_hour_and_group_name?date=${encodeURIComponent(date)}&hour=${encodeURIComponent(hour)}&group_name=${encodeURIComponent(group_name)}&line_name=${encodeURIComponent(line_name)}`;

    const response = await fetch(url, {
        cache: "no-cache",
    }).catch((error) => {
        throw new ServerUnreachableError("An unexpected error occurred", error);
    });

    return await responseHandler(response, url);
};
