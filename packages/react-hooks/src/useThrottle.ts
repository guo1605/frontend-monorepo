import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();

    if (now - lastExecuted.current >= delay) {
      setThrottledValue(value);
      lastExecuted.current = Date.now();
    }
  }, [value, delay]);

  return throttledValue;
}