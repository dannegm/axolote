import { useEffect } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';

import useSettings from '@/modules/core/hooks/use-settings';
import useFingerprint from '@/modules/core/hooks/use-fingerprint';
import { clientApi } from '@/modules/krystel/services/client-api';

export default function useTrackAction() {
    if (typeof window === 'undefined') return;
    const fingerprint = useFingerprint();
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({ mutationFn: vars => clientApi().track(vars) });

    useEffect(() => {
        if (skipActions || skipActionsSettings) return;
        mutation.mutate({
            sid: fingerprint,
            userAgent: window.navigator.userAgent,
            referrer: document.referrer,
        });
    }, [fingerprint]);
}
