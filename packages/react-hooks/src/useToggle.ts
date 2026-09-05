import { useCallback, useState } from 'react';

export function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prevState: boolean) => !prevState);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse };
};