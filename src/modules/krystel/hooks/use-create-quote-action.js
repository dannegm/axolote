import { useMutation, useQueryClient } from '@tanstack/react-query';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export default function useCreateQuoteAction(args) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ quote, published_at = new Date() }) => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/krystel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-dnn-tracker': token },
                body: JSON.stringify({ quote, published_at }),
            });
            return resp.json();
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['cards'] }),
        ...args,
    });

    return mutation;
}
