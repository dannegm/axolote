'use client';
import { useEffect } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import useSettings from '@/modules/core/hooks/use-settings';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import { trackAction } from '@/modules/krystel/actions/trackAction';

const useFingerprint = () => {
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
};

export default function useTrackAction() {
    if (typeof window === 'undefined') return;
    const fingerprint = useFingerprint();
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: trackAction,
    });

    const registerSession = () => {
        if (skipActions || skipActionsSettings) return;

        mutation.mutate({
            sid: fingerprint,
            userAgent: window.navigator.userAgent,
            referrer: document.referrer,
        });
    };

    useEffect(() => {
        registerSession();
    }, [fingerprint]);
}
