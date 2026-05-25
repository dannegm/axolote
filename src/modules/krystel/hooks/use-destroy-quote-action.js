import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/modules/krystel/services/client-api';

export default function useDestroyQuoteAction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vars => clientApi().destroyQuote(vars),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['quotes'] });
        },
    });
}
