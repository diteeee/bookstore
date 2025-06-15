import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // GET request on mount
    useEffect(() => {
        if (!url) return; // Skip fetch if URL is null
        setLoading(true);
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                setError(err.message || "GET request failed");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    async function post<D>(payload: D) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            setData(result);
        } catch (err: any) {
            setError(err.message || "POST failed");
        } finally {
            setLoading(false);
        }
    }

    async function put<D>(payload: D) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message || "PUT failed");
        } finally {
            setLoading(false);
        }
    }

    async function remove(customUrl?: string) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(customUrl || url, {
                method: "DELETE",
            });
            const result = await res.json();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message || "DELETE failed");
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, post, put, remove };
}

export default useFetch;
