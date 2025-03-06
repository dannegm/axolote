import { useState, useEffect } from 'react';
import { differenceInMilliseconds } from 'date-fns';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';

export default function useHasElapsedTime(
    key = 'record:last_record',
    duration = 24 * 60 * 60 * 1000,
) {
    const [lastRecord, setLastRecord] = useLocalStorage(key, null);
    const [hasElapsed, setHasElapsed] = useState(false);

    useEffect(() => {
        if (!lastRecord) {
            setLastRecord(new Date().toISOString());
        }
    }, [lastRecord]);

    useEffect(() => {
        if (lastRecord) {
            const now = new Date();
            const lastTime = new Date(lastRecord);
            console.log(lastTime);

            if (differenceInMilliseconds(now, lastTime) >= duration) {
                setHasElapsed(true);
                setLastRecord(now);
            } else {
                setHasElapsed(false);
            }
        }
    }, [lastRecord, duration]);

    return hasElapsed;
}
