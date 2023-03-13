import { useState, useEffect } from "react";

export default function useDebounce(val, delay) {
  const [debounced, setDebounced] = useState(val);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(val);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [val]);
  return debounced;
};
