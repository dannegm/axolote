'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostAction } from '../actions/createPostAction';

export default function useCreatePostAction(args) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createPostAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
        ...args,
    });

    return mutation;
}
