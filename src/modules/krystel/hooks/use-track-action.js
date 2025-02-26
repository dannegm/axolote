'use client';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';

import useSettings from '@/modules/core/hooks/use-settings';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import { trackAction } from '@/modules/krystel/actions/trackAction';

export default function useTrackAction() {
    if (typeof window === 'undefined') return;
    const [sid] = useLocalStorage('sid', nanoid());
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: trackAction,
    });

    const registerSession = () => {
        if (skipActions || skipActionsSettings) return;

        mutation.mutate({
            sid,
            userAgent: window.navigator.userAgent,
            referrer: document.referrer,
        });
    };

    useEffect(() => {
        registerSession();
    }, [sid]);
}
