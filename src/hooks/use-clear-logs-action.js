'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearLogsAction } from '@/actions/clearLogsAction';
import useDebouncedCallback from '@/hooks/use-debounced-callback';

export default function useClearLogsAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: clearLogsAction,
        onSuccess: () => {
            queryClient.invalidateQueries(['quotes']);
        },
    });

    return useDebouncedCallback(() => {
        mutation.mutate();
    }, 1000);
}
