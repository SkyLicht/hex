'use client';
import { useEffect, useState } from "react";
import {HEX_CREATE_ROUTE} from "@/hook/refers";

// Define the type for each platform/service item
export interface InServiceItem {
    sku: string;
    f_n: number;
    id: string;
    cost: number;
    components: number;
    width: number;
    created_at: string;
    platform: string;
    uph: number;
    in_service: boolean;
    components_list_id: string;
    height: number;
    updated_at: string;
}

const API_BASE_URL = HEX_CREATE_ROUTE("platform");

type UseAllInServiceResult = {
    items: InServiceItem[] | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};

export function useGetPlatformInService(): UseAllInServiceResult {
    const [items, setItems] = useState<InServiceItem[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllInService = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/get_all_in_service`);
            if (!response.ok) {
                const { detail } = await response.json();
                throw new Error(detail || "Failed to fetch in-service items");
            }
            const data = await response.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (err: any) {
            setError(err.message || "Error fetching in-service items");
            setItems(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllInService();
    }, []);

    return { items, loading, error, refetch: fetchAllInService };
}