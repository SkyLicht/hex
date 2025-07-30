import {WorkPlanModel} from "@/features/types/work-plan";
import {HEX_CREATE_ROUTE} from "@/hook/refers";
import {responseHandler, ServerUnreachableError} from "@/lib/sl-request";

const API_BASE_URL = HEX_CREATE_ROUTE("planner"); // Set your API IP and
export const getWorkPlanByDateAndLineName = async (
    str_date: string,
    line_name: string
): Promise<WorkPlanModel> => {
    "use server";
    const url = `${API_BASE_URL}/get_work_plan_by_str_date_and_line_name?str_date=${encodeURIComponent(str_date)}&line_name=${encodeURIComponent(line_name)}`;
    const response = await fetch(url, {
        cache: "force-cache",
    }).catch((error) => {
        throw new ServerUnreachableError("An unexpected error occurred", error);
    });
    return await responseHandler(response, url);
};
