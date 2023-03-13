import { useState, useEffect } from "react";
// https://vitejs.dev/guide/env-and-mode.html
// vite requires env arg : import.meta.env.VITE_SOME_KEY
export default function useFetch(key, url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            apikey: key,
          },
        });
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [key, url]);

  return { data, error, loading };
}