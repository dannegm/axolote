import { useMutation, useQueryClient } from '@tanstack/react-query';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export default function useDeletePostAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async postId => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/krystel/posts/${postId}`, {
                method: 'DELETE',
                headers: { 'x-dnn-tracker': token },
            });
            return resp.json();
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });

    return postId => {
        mutation.mutate(postId);
    };
}
