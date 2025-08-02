'use client';
import { useEffect, useState } from "react";
import { HEX_CREATE_ROUTE } from "@/hook/refers";
import {PPIDModel} from "@/types/statistics-models";

const API_BASE_URL = HEX_CREATE_ROUTE("ppid");

interface UseCurrentHourPPIDResult {
    data: PPIDModel[] | null;
    loading: boolean;
    error: string | null;
    refetch: (groupName?: string, lineName?: string) => Promise<void>;
}

export function useCurrentHourPPID(
    groupName: string,
    lineName: string,
    options?: {
        enabled?: boolean; // Whether to auto-fetch on mount
        refetchInterval?: number; // Auto-refetch interval in milliseconds
    }
): UseCurrentHourPPIDResult {
    const [data, setData] = useState<PPIDModel[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrentHourPPID = async (
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
            // Get current local time
            const now = new Date();

            // Format date as YYYY-MM-DD (local time)
            const date = now.getFullYear() + '-' +
                String(now.getMonth() + 1).padStart(2, '0') + '-' +
                String(now.getDate()).padStart(2, '0');

            // Format hour as HH:00:00 (local time)
            const hour = String(now.getHours()).padStart(2, '0') + ':00:00';

            const url = `${API_BASE_URL}/get_ppid_by_date_hour_and_group_name?date=${encodeURIComponent(date)}&hour=${encodeURIComponent(hour)}&group_name=${encodeURIComponent(group_name)}&line_name=${encodeURIComponent(line_name)}`;

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
            setError(err.message || "Error fetching PPID data");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch on mount if enabled (default: true)
    useEffect(() => {
        if (options?.enabled !== false && groupName && lineName) {
            fetchCurrentHourPPID();
        }
    }, [groupName, lineName, options?.enabled]);

    // Auto-refetch interval
    useEffect(() => {
        if (options?.refetchInterval && options.refetchInterval > 0 && groupName && lineName) {
            const interval = setInterval(() => {
                fetchCurrentHourPPID();
            }, options.refetchInterval);

            return () => clearInterval(interval);
        }
    }, [groupName, lineName, options?.refetchInterval]);

    return {
        data,
        loading,
        error,
        refetch: fetchCurrentHourPPID
    };
}

// Alternative hook for manual fetching only
export function useCurrentHourPPIDLazy(): {
    data: PPIDModel[] | null;
    loading: boolean;
    error: string | null;
    fetchPPID: (groupName: string, lineName: string) => Promise<void>;
} {
    const [data, setData] = useState<PPIDModel[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPPID = async (groupName: string, lineName: string) => {
        if (!groupName || !lineName) {
            setError("Group name and line name are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Get current local time
            const now = new Date();

            // Format date as YYYY-MM-DD (local time)
            const date = now.getFullYear() + '-' +
                String(now.getMonth() + 1).padStart(2, '0') + '-' +
                String(now.getDate()).padStart(2, '0');

            // Format hour as HH:00:00 (local time)
            const hour = String(now.getHours()).padStart(2, '0') + ':00:00';

            const url = `${API_BASE_URL}/get_ppid_by_date_hour_and_group_name?date=${encodeURIComponent(date)}&hour=${encodeURIComponent(hour)}&group_name=${encodeURIComponent(groupName)}&line_name=${encodeURIComponent(lineName)}`;

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
            setError(err.message || "Error fetching PPID data");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        fetchPPID
    };
}


interface UsePPIDCurrentDayResult {
    data: PPIDModel[] | null;
    loading: boolean;
    error: string | null;
    refetch: (groupName?: string, lineName?: string) => Promise<void>;
}

export function usePPIDCurrentDay(
    groupName: string,
    lineName: string,
    options?: {
        enabled?: boolean; // Whether to auto-fetch on mount
        refetchInterval?: number; // Auto-refetch interval in milliseconds
    }
): UsePPIDCurrentDayResult {
    const [data, setData] = useState<PPIDModel[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPPIDCurrentDay = async (
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
            const url = `${API_BASE_URL}/get_ppid_current_day?group_name=${encodeURIComponent(group_name)}&line_name=${encodeURIComponent(line_name)}`;

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
            setError(err.message || "Error fetching current day PPID data");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch on mount if enabled (default: true)
    useEffect(() => {
        if (options?.enabled !== false && groupName && lineName) {
            fetchPPIDCurrentDay();
        }
    }, [groupName, lineName, options?.enabled]);

    // Auto-refetch interval
    useEffect(() => {
        if (options?.refetchInterval && options.refetchInterval > 0 && groupName && lineName) {
            const interval = setInterval(() => {
                fetchPPIDCurrentDay();
            }, options.refetchInterval);

            return () => clearInterval(interval);
        }
    }, [groupName, lineName, options?.refetchInterval]);

    return {
        data,
        loading,
        error,
        refetch: fetchPPIDCurrentDay
    };
}
