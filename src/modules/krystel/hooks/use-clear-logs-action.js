import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearLogsAction } from '@/modules/krystel/actions/clearLogsAction';

export default function useClearLogsAction() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: clearLogsAction,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
    });

    return () => {
        mutation.mutate();
    };
}
