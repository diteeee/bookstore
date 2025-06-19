import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;
        setLoading(true);
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(setData)
            .catch((err) => setError(err.message || "GET request failed"))
            .finally(() => setLoading(false));
    }, [url]);

    async function post<D>(payload: D): Promise<{ data?: T; error?: string }> {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || "POST request failed");
            }

            setData(result);
            return { data: result };
        } catch (err: any) {
            setError(err.message || "POST failed");
            return { error: err.message };
        } finally {
            setLoading(false);
        }
    }

    async function put<D>(payload: D): Promise<{ data?: T; error?: string }> {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || "PUT request failed");
            }

            setData(result);
            return { data: result };
        } catch (err: any) {
            setError(err.message || "PUT failed");
            return { error: err.message };
        } finally {
            setLoading(false);
        }
    }

    async function remove(customUrl?: string): Promise<{ data?: T; error?: string }> {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(customUrl || url, {
                method: "DELETE",
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || "DELETE request failed");
            }

            setData(result);
            return { data: result };
        } catch (err: any) {
            setError(err.message || "DELETE failed");
            return { error: err.message };
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, post, put, remove };
}

export default useFetch;
