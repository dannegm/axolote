'use client';
import { useEffect, useState } from 'react';
import ProgressCircle from './progress-circle';

export default function CircularTimeout({ timeout, gaps = 100, ...props }) {
    const [value, setValue] = useState(timeout);
    const total = timeout;

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - gaps;
            });
        }, gaps);

        return () => clearInterval(interval);
    }, [timeout]);

    return <ProgressCircle value={value} total={total} {...props} />;
}
