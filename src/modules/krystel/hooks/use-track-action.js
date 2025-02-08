'use client';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';

import { trackAction } from '@/modules/krystel/actions/trackAction';
import { useEffect } from 'react';

export default function useTrackAction() {
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: trackAction,
    });

    useEffect(() => {
        if (!skipActions) {
            mutation.mutate({
                userAgent: window.navigator.userAgent,
                referrer: document.referrer,
            });
        }
    }, []);
}
