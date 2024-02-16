import { useEffect, useState } from 'react';

/**
 * Хук, который позволяет отменить предыдущий вызов функции, пока не истечет delay
 * @param value
 * @param delay - задержка, м/с
 */

export const useDebounce = <T>(value: T, delay?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};
