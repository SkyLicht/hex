'use client'
import { useState } from "react";

// You can replace this with process.env.NEXT_PUBLIC_API_URL in a real setup
const API_BASE_URL = "http://localhost:8000/api/v1/planner"; // Set your API IP and port here

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
    created_at: string;
    updated_at: string;
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
    uph_i: number;
    start_hour: number;
    end_hour: number;
    str_date: string;
    week: number;
    head_count: number;
    ft: number;
    ict: number;
    created_at: string;
    updated_at: string;
    platform: Platform;
    line: Line;
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