import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/modules/krystel/services/client-api';

export default function useDeletePostAction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postId => clientApi().deletePost(postId),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });
}
