'use client';
import { useEffect, useState } from "react";

// Line
export interface LineSmall {
    id: string;
    is_active: boolean;
    description: string;
    name: string;
}

// Factory (with lines)
export interface FactoryWithLines {
    id: string;
    name: string;
    lines: LineSmall[];
}

const API_BASE_URL = "http://localhost:8000/api/v1/layout";

interface UseLinesResult {
    factories: FactoryWithLines[] | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useLines(): UseLinesResult {
    const [factories, setFactories] = useState<FactoryWithLines[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLines = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/get_lines`);
            if (!response.ok) {
                const { detail } = await response.json();
                throw new Error(detail || "Failed to get lines");
            }
            const data = await response.json();
            setFactories(data);
        } catch (err: any) {
            setError(err.message || "Error fetching lines");
            setFactories(null);
        } finally {
            setLoading(false);
        }
    };

    // On mount
    useEffect(() => {
        fetchLines();
    }, []);

    return { factories, loading, error, refetch: fetchLines };
}