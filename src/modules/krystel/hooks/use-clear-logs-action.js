import { useMutation, useQueryClient } from '@tanstack/react-query';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export default function useClearLogsAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const token = JSON.parse(localStorage.getItem('app:tracker'));
            const resp = await fetch(`${HOSTNAME}/actions`, {
                method: 'DELETE',
                headers: { 'x-dnn-tracker': token },
            });
            return resp.json();
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
    });

    return () => {
        mutation.mutate();
    };
}
