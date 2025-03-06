'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { destroyPostAction } from '../actions/destroyPostAction';

export default function useDestroyPostAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: destroyPostAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });

    return postId => {
        mutation.mutate(postId);
    };
}
