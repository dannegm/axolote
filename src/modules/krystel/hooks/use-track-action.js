'use client';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useMutation } from '@tanstack/react-query';
import { trackAction } from '@/modules/krystel/actions/trackAction';

export default function useTrackAction() {
    const [sid] = useLocalStorage('sid', nanoid());
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: trackAction,
    });

    useEffect(() => {
        if (!skipActions) {
            mutation.mutate({
                sid,
                userAgent: window.navigator.userAgent,
                referrer: document.referrer,
            });
        }
    }, [sid]);
}
