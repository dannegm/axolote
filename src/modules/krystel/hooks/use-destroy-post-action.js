import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/modules/krystel/services/client-api';

export default function useDestroyPostAction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postId => clientApi().destroyPost(postId),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });
}
