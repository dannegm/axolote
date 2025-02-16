'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleQuoteAction } from '../actions/toggleQuoteAction';

export default function useToggleQuoteAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: toggleQuoteAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['cards'] }),
    });

    return mutation;
}
