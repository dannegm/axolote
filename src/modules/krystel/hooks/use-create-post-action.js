import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/modules/krystel/services/client-api';

export default function useCreatePostAction(args) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vars => clientApi().createPost(vars),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
        ...args,
    });
}
