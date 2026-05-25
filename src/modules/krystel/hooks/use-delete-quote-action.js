import { useMutation, useQueryClient } from '@tanstack/react-query';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export default function useDeleteQuoteAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ quoteId }) => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/krystel/${quoteId}`, {
                method: 'DELETE',
                headers: { 'x-dnn-tracker': token },
            });
            return resp.json();
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['quotes'] });
        },
    });

    return mutation;
}
