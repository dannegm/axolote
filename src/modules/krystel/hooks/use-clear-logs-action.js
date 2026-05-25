import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/modules/krystel/services/client-api';

export default function useClearLogsAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => clientApi().clearLogs(),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
    });

    return () => mutation.mutate();
}
