import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';

import useSettings from '@/modules/core/hooks/use-settings';
import useDebouncedCallback from '@/modules/core/hooks/use-debounced-callback';
import { clientApi } from '@/modules/krystel/services/client-api';

export default function usePageViewAction({ page }) {
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({ mutationFn: vars => clientApi().postPageView(vars) });

    return useDebouncedCallback(() => {
        console.log('usePageViewAction called with page:', page, { skipActions, skipActionsSettings });
        if (skipActions || skipActionsSettings) return;

        console.log('Sending page view action for page:', page);
        const userAgent = window.navigator.userAgent;
        mutation.mutate({ page, userAgent });
    }, 1000);
}
