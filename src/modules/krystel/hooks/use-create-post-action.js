import { useMutation, useQueryClient } from '@tanstack/react-query';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export default function useCreatePostAction(args) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async payload => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/krystel/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-dnn-tracker': token },
                body: JSON.stringify(payload),
            });
            return resp.json();
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
        ...args,
    });

    return mutation;
}
