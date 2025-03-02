import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function DataLoader({
    url,
    params,
    tags = [],
    loader = null,
    preventRefetch = false,
    realtime = false,
    realtimeWindow = 1000,
    onError,
    children = () => null,
} = {}) {
    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: tags,
        queryFn: async () => {
            const resp = await fetch(url + new URLSearchParams(params));
            if (!resp.ok) {
                throw new Error('Network error');
            }

            return resp.json();
        },
        refetchOnWindowFocus: realtime || !preventRefetch,
        refetchOnReconnect: realtime || !preventRefetch,
        refetchOnMount: realtime || !preventRefetch,
        refetchInterval: !realtime ? !preventRefetch : realtimeWindow,
        refetchIntervalInBackground: !preventRefetch,
    });

    useEffect(() => {
        if (!isFetching && error) {
            console.log({ isFetching, error });
            onError?.(error);
        }
    }, [isFetching, error]);

    if (isLoading) {
        return loader || <div>Loading...</div>;
    }

    if (error) {
        return loader || <div>Error: {error.message}</div>;
    }

    return children(data);
}
