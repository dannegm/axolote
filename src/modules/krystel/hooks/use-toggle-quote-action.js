import { useMutation, useQueryClient } from '@tanstack/react-query';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export default function useToggleQuoteAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ quoteId, show }) => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/krystel/${quoteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-dnn-tracker': token },
                body: JSON.stringify({ show }),
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
