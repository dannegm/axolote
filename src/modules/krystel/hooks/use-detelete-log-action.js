'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLogAction } from '@/modules/krystel/actions/deleteLogAction';

export default function useDeleteLogAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteLogAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
    });

    return logId => {
        mutation.mutate(logId);
    };
}
