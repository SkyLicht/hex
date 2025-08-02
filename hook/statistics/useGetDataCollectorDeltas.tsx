'use client';
import {useEffect, useState} from "react";
import {HEX_CREATE_ROUTE} from "@/hook/refers";

export interface PPIDDelta {
    from_timestamp: string;
    from_ppid: string;
    to_timestamp: string;
    to_ppid: string;
    delta_seconds: number;
    delta_minutes: number;
}

export interface PPIDDeltaStatistics {
    total_records: number;
    total_deltas: number;
    avg_delta_seconds: number;
    min_delta_seconds: number;
    max_delta_seconds: number;
    avg_delta_minutes: number;
    hourly_summary: {
        "hour": number,
        "quantity": number
    }[]
}


export interface PPIDDeltaGrouped {
    deltas_1_min: PPIDDelta[];

    // Add other time groups as needed (e.g., deltas_5_min, deltas_10_min)
    [key: string]: PPIDDelta[];
}

export interface PPIDCurrentDayDeltasResponse {
    statistics: PPIDDeltaStatistics;
    listed_deltas: PPIDDelta[];
    grouped_deltas: PPIDDeltaGrouped;
    total_groups: number;
}


const API_BASE_URL = HEX_CREATE_ROUTE("ppid");

interface UsePPIDCurrentDayDeltasResult {
    data: PPIDCurrentDayDeltasResponse | null;
    loading: boolean;
    error: string | null;
    refetch: (groupName?: string, lineName?: string) => Promise<void>;
}

export function usePPIDCurrentDayDeltas(
    groupName: string,
    lineName: string,
    options?: {
        enabled?: boolean; // Whether to auto-fetch on mount
        refetchInterval?: number; // Auto-refetch interval in milliseconds
    }
): UsePPIDCurrentDayDeltasResult {
    const [data, setData] = useState<PPIDCurrentDayDeltasResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPPIDCurrentDayDeltas = async (
        group_name: string = groupName,
        line_name: string = lineName
    ) => {
        if (!group_name || !line_name) {
            setError("Group name and line name are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const url = `${API_BASE_URL}/get_ppid_current_day_deltas?group_name=${encodeURIComponent(group_name)}&line_name=${encodeURIComponent(line_name)}`;

            const response = await fetch(url, {
                cache: "no-cache",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message || "Error fetching current day PPID deltas");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch on mount if enabled (default: true)
    useEffect(() => {
        if (options?.enabled !== false && groupName && lineName) {
            fetchPPIDCurrentDayDeltas();
        }
    }, [groupName, lineName, options?.enabled]);

    // Auto-refetch interval
    useEffect(() => {
        if (options?.refetchInterval && options.refetchInterval > 0 && groupName && lineName) {
            const interval = setInterval(() => {
                fetchPPIDCurrentDayDeltas();
            }, options.refetchInterval);

            return () => clearInterval(interval);
        }
    }, [groupName, lineName, options?.refetchInterval]);

    return {
        data,
        loading,
        error,
        refetch: fetchPPIDCurrentDayDeltas
    };
}

// Alternative hook for manual fetching only
export function usePPIDCurrentDayDeltasLazy(): {
    data: PPIDCurrentDayDeltasResponse | null;
    loading: boolean;
    error: string | null;
    fetchDeltas: (groupName: string, lineName: string) => Promise<void>;
} {
    const [data, setData] = useState<PPIDCurrentDayDeltasResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDeltas = async (groupName: string, lineName: string) => {
        if (!groupName || !lineName) {
            setError("Group name and line name are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const url = `${API_BASE_URL}/get_ppid_current_day_deltas?group_name=${encodeURIComponent(groupName)}&line_name=${encodeURIComponent(lineName)}`;

            const response = await fetch(url, {
                cache: "no-cache",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message || "Error fetching current day PPID deltas");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        fetchDeltas
    };
}
