import { useRef, useCallback } from 'react';

export default function useDebouncedCallback(callback, delay) {
    const timeoutRef = useRef(null);

    const debouncedCallback = useCallback(
        (...args) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );

    return debouncedCallback;
}
