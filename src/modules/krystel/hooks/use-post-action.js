'use client';
import { useMutation } from '@tanstack/react-query';
import { postAction } from '@/modules/krystel/actions/postAction';
import useDebouncedCallback from '@/modules/core/hooks/use-debounced-callback';

export default function usePostAction({ action, settings }) {
    const mutation = useMutation({
        mutationFn: postAction,
    });

    return useDebouncedCallback(() => {
        const [quoteId] = settings.split(':');
        const userAgent = window.navigator.userAgent;
        mutation.mutate({ action, quoteId, settings, userAgent });
    }, 1000);
}
