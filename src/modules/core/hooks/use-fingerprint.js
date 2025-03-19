import { useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';

export default function useFingerprint() {
    const [fingerprint, setFingerprint] = useLocalStorage('fingerprint', null);

    useEffect(() => {
        if (fingerprint) return;

        (async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setFingerprint(result.visitorId);
        })();
    }, []);

    return fingerprint;
}
