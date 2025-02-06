import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useStoredState = <
  S extends string | number | boolean | null | object | [],
>(
  key: string,
  defaultValue: S,
): [S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = useState<S>(() => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
