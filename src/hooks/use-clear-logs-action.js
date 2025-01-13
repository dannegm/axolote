'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearLogsAction } from '@/actions/clearLogsAction';

export default function useClearLogsAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: clearLogsAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['quotes'] }),
    });

    return () => {
        mutation.mutate();
    };
}
