'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { destroyQuoteAction } from '../actions/destroyQuoteAction';

export default function useDestroyQuoteAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: destroyQuoteAction,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['quotes'] });
        },
    });

    return mutation;
}
