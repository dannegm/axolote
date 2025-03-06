'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePostAction } from '../actions/deletePostAction';

export default function useDeletePostAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deletePostAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });

    return postId => {
        mutation.mutate(postId);
    };
}
