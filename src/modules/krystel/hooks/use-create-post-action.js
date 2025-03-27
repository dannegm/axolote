import { useMutation, useQueryClient } from '@tanstack/react-query';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
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
