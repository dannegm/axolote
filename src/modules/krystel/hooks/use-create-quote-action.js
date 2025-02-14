'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuoteAction } from '../actions/createQuoteAction';

export default function useCreateQuoteAction({ onSuccess, onError }) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createQuoteAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['cards'] }),
        onSuccess,
        onError,
    });

    return quote => {
        mutation.mutate(quote);
    };
}
