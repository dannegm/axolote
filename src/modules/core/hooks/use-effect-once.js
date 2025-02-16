import { useEffect, useRef } from 'react';

export default function useEffectOnce(effect, deps) {
    const hasRun = useRef(new Set());

    useEffect(() => {
        const key = JSON.stringify(deps);
        if (!hasRun.current.has(key)) {
            hasRun.current.add(key);
            return effect();
        }
    }, [deps]);
}
