import { useEffect, useState } from 'react';

export default function useAsync(asyncFunction, deps = []) {
    const [result, setResult] = useState(null);

    useEffect(() => {
        let isMounted = true;

        asyncFunction.then(data => {
            if (isMounted) setResult(data);
        });

        return () => {
            isMounted = false;
        };
    }, deps);

    return result;
}
