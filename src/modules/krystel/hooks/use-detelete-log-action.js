import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/modules/krystel/services/client-api';

export default function useDeleteLogAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: id => clientApi().deleteLog(id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
    });

    return logId => mutation.mutate(logId);
}
