import { useState, useEffect } from 'react';
import { differenceInMilliseconds } from 'date-fns';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useEffectOnce from './use-effect-once';

export const ElapsedTime = {
    UNINITIALIZED: 'UNINITIALIZED',
    PASSED: 'PASSED',
    WAITING: 'WAITING',
};

export default function useHasElapsedTime(
    key = 'record:last_record',
    duration = 24 * 60 * 60 * 1000,
) {
    const [lastRecord, setLastRecord, setSilentLastRecord] = useLocalStorage(key, null);
    const [hasElapsed, setHasElapsed] = useState(ElapsedTime.UNINITIALIZED);

    useEffectOnce(() => {
        if (!lastRecord) {
            setLastRecord(new Date().toISOString());
        }
    }, [lastRecord]);

    useEffect(() => {
        if (lastRecord) {
            const now = new Date();
            const lastTime = new Date(lastRecord);

            if (differenceInMilliseconds(now, lastTime) >= duration) {
                setHasElapsed(ElapsedTime.PASSED);
                setSilentLastRecord(now.toISOString());
            } else {
                setHasElapsed(ElapsedTime.WAITING);
            }
        }
    }, [lastRecord, duration]);

    return hasElapsed;
}
