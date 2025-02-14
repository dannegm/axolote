'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuoteAction } from '../actions/deleteQuoteAction';

export default function useDeleteQuoteAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteQuoteAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['cards'] }),
    });

    return quoteId => {
        mutation.mutate(quoteId);
    };
}
