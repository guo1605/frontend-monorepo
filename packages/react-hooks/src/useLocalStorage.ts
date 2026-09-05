import { useState } from 'react';
import { storage } from '@frontend/utils';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = storage.get(key, initialValue);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const updateValue = (nextValue: T | ((preValue: T) => T)) => {
    setValue((preValue: T) => {
      const newValue = typeof nextValue === 'function' ?
        (nextValue as (preValue: T) => T)(preValue) : nextValue;

      storage.set(key, JSON.stringify(newValue));
      return newValue;
    });
  }

  return [value, updateValue] as const;
};