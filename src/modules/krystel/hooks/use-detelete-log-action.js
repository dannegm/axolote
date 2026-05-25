import { useMutation, useQueryClient } from '@tanstack/react-query';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export default function useDeleteLogAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async actionId => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/actions/${actionId}`, {
                method: 'DELETE',
                headers: { 'x-dnn-tracker': token },
            });
            return resp.json();
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
    });

    return logId => {
        mutation.mutate(logId);
    };
}
