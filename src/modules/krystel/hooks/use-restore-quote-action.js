import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreQuoteAction } from '../actions/restoreQuoteAction';

export default function useRestoreQuoteAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: restoreQuoteAction,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['quotes'] });
        },
    });

    return mutation;
}
