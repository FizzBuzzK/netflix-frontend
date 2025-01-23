import { useState, useEffect } from "react";

// ------------------------------------------------------------------
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  // ___________________________________
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  },

  [value, delay]
  );

  // ___________________________________
  return debounceValue;
};
