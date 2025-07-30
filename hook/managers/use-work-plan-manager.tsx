'use client'
import { useState, useCallback } from "react";
import {HEX_CREATE_ROUTE} from "@/hook/refers";

// You can replace this with process.env.NEXT_PUBLIC_API_URL in a real setup
const API_BASE_URL = HEX_CREATE_ROUTE("planner"); // Set your API IP and port here

export interface CreateWorkPlanInput {
    platform_id?: string;
    line_id?: string;
    planned_hours?: number;
    target_oee?: number;
    uph_i?: number;
    start_hour?: number;
    end_hour?: number;
    str_date?: string;
    week?: number;
    head_count?: number;
    ft?: number;
    ict?: number;
}

interface Platform {
    id: string;
    platform: string;
    sku: string;
    uph: number;
    cost: number;
    width: number;
    height: number;
    components: number;
    components_list_id: string;
    f_n: number;
    in_service: boolean;
    created_at?: string;
    updated_at?: string;
}

interface Factory {
    id: string;
    name: string;
}

interface Line {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    factory_id: string;
    created_at: string;
    updated_at: string;
    factory: Factory;
}

export interface WorkPlan {
    id: string;
    platform_id: string;
    line_id: string;
    planned_hours: number;
    target_oee: number;
    uph_i?: number;
    uph?: number;
    start_hour: number;
    end_hour: number;
    str_date: string;
    week: number;
    head_count: number;
    ft: number;
    ict: number;
    line: string;
    factory: string;
    uph_meta: number;
    commit: number;
    commit_full: number;
    created_at?: string;
    updated_at?: string;
    platform: Platform;
}

interface UseCreateWorkPlanResult {
    loading: boolean;
    error: string | null;
    data: any;
    success: boolean;
    createWorkPlan: (input: CreateWorkPlanInput) => Promise<boolean>;
}

export function useCreateWorkPlan(): UseCreateWorkPlanResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    const [success, setSuccess] = useState(false);

    const createWorkPlan = async (input: CreateWorkPlanInput): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setData(null);
        setSuccess(false);

        try {
            const response = await fetch(`${API_BASE_URL}/create_work_plan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });

            if (!response.ok) {
                const { detail } = await response.json();
                throw new Error(detail || "Failed to create work plan");
            }
            const respData = await response.json();
            setData(respData);
            setSuccess(true);
            return true;
        } catch (err: any) {
            setError(err.message || "Error creating work plan");
            setSuccess(false);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, success, createWorkPlan };
}

interface UseGetWorkPlansByStrDateResult {
    loading: boolean;
    error: string | null;
    data: WorkPlan[] | null;
    getWorkPlans: (str_date: string) => Promise<void>;
}

export function useGetWorkPlansByStrDate(): UseGetWorkPlansByStrDateResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<WorkPlan[] | null>(null);

    const getWorkPlans = async (str_date: string) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}/get_work_plans_by_str_date?str_date=${encodeURIComponent(str_date)}`
            );

            if (!response.ok) {
                const { detail } = await response.json();
                throw new Error(detail || "Failed to fetch work plans");
            }
            const respData: WorkPlan[] = await response.json();
            setData(respData);
        } catch (err: any) {
            setError(err.message || "Error fetching work plans");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, getWorkPlans };
}

interface UseGetWorkPlanByDateAndLineNameResult {
    loading: boolean;
    error: string | null;
    data: WorkPlan | null;
    getWorkPlan: (str_date: string, line_name: string) => Promise<void>;
}


export async function getWorkPlanByDateAndLineName(
    str_date: string,
    line_name: string
): Promise<WorkPlan | null> {

    console.log("SDffd")
    try {
        const response = await fetch(
            `${API_BASE_URL}/get_work_plan_by_str_date_and_line_name?str_date=${encodeURIComponent(str_date)}&line_name=${encodeURIComponent(line_name)}`,
            {
                cache: 'no-store', // or 'force-cache' depending on your needs
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch work plan: ${response.statusText}`);
        }

        const data: WorkPlan = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching work plan:', error);
        return null;
    }
}



// Hook version for easier use in React components
export function useGetWorkPlanByDateAndLineName() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<WorkPlan | null>(null);

    const fetchWorkPlan = useCallback(async (str_date: string, line_name: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await getWorkPlanByDateAndLineName(str_date, line_name);
            setData(result);
            if (!result) {
                setError('No work plan found');
            }
        } catch (err) {
            setError('Failed to fetch work plan');
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array since the function doesn't depend on any external values

    return {
        loading,
        error,
        data,
        fetchWorkPlan
    };
}