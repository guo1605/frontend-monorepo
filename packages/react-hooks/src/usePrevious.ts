import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const previousValue = useRef<T>(undefined);

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return previousValue.current;
}