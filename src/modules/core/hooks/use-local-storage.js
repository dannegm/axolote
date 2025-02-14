'use client';
import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') return initialValue;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {}
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
