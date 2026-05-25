import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';

import useSettings from '@/modules/core/hooks/use-settings';
import useDebouncedCallback from '@/modules/core/hooks/use-debounced-callback';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export default function usePageViewAction({ page }) {
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: async ({ page: p, userAgent = 'unknown' }) => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/none/action/page_view?ua=${userAgent}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-dnn-tracker': token },
                body: JSON.stringify({ page: p }),
            });
            return resp.json();
        },
    });

    return useDebouncedCallback(() => {
        console.log('usePageViewAction called with page:', page, {
            skipActions,
            skipActionsSettings,
        });
        if (skipActions || skipActionsSettings) return;

        console.log('Sending page view action for page:', page);
        const userAgent = window.navigator.userAgent;
        mutation.mutate({ page, userAgent });
    }, 1000);
}
