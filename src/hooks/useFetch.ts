import { useEffect, useState, useCallback } from "react";
import api from "../service/api";

export function useFetch<T = any>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      console.log("🔎 Chamada real:", api.defaults.baseURL + url);
      const res = await api.get<T>(url);
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false)
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}