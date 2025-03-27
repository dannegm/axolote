import { useMutation, useQueryClient } from '@tanstack/react-query';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import { clearLogsAction } from '@/modules/krystel/actions/clearLogsAction';

export default function useClearLogsAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: clearLogsAction({ token }),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
    });

    return () => {
        mutation.mutate();
    };
}
