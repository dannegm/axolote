'use client';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useDebouncedCallback from '@/modules/core/hooks/use-debounced-callback';
import { postPageViewAction } from '@/modules/krystel/actions/postPageViewAction';

export default function usePageViewAction({ page }) {
    const [skipActionsSettings] = useLocalStorage('settings:skip_actions', false);
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: postPageViewAction,
    });

    return useDebouncedCallback(() => {
        if (skipActions || skipActionsSettings) return;
        const userAgent = window.navigator.userAgent;
        mutation.mutate({ page, userAgent });
    }, 1000);
}
