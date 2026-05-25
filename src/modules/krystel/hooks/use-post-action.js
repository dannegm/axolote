import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';

import useSettings from '@/modules/core/hooks/use-settings';
import useDebouncedCallback from '@/modules/core/hooks/use-debounced-callback';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export default function usePostAction({ action, settings = 'none' }) {
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: async ({ action: act, quoteId, settings: s, userAgent = 'unknown' }) => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/${quoteId}/action/${act}?code=${s}&ua=${userAgent}`, {
                method: 'POST',
                headers: { 'x-dnn-tracker': token },
            });
            return resp.json();
        },
    });

    return useDebouncedCallback(() => {
        if (skipActions || skipActionsSettings) return;
        const [quoteId] = settings.split(':');
        const userAgent = window.navigator.userAgent;
        mutation.mutate({ action, quoteId, settings, userAgent });
    }, 1000);
}
