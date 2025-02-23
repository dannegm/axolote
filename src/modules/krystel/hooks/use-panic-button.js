'use client';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { useMutation } from '@tanstack/react-query';
import { Ntfy } from '@/modules/core/services/ntfy';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useDebouncedCallback from '@/modules/core/hooks/use-debounced-callback';

const APP_TOPIC = process.env.NEXT_PUBLIC_APP_TOPIC;
const ntfy = new Ntfy(APP_TOPIC);

export default function usePanicButton(args) {
    const [skipActionsSettings] = useLocalStorage('settings:skip_actions', false);
    const [skipActions] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const mutation = useMutation({
        mutationFn: message => ntfy.pushSimple({ message }),
        ...args,
    });

    return useDebouncedCallback(message => {
        if (skipActions || skipActionsSettings) return;
        mutation.mutate(message);
    }, 300);
}
