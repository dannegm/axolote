'use client';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';

import useDebouncedCallback from '@/modules/core/hooks/use-debounced-callback';
import { postAction } from '@/modules/krystel/actions/postAction';

export default function usePostAction({ action, settings }) {
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: postAction,
    });

    return useDebouncedCallback(() => {
        if (skipActions) return;
        const [quoteId] = settings.split(':');
        const userAgent = window.navigator.userAgent;
        mutation.mutate({ action, quoteId, settings, userAgent });
    }, 1000);
}
