import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function DataLoader({
    url,
    params,
    headers = {},
    tags = [],
    loader = null,
    preventRefetch = false,
    retry = 3,
    realtime = false,
    realtimeWindow = 1000,
    onError,
    children = () => null,
} = {}) {
    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: tags,
        queryFn: async () => {
            const resp = await fetch(url + new URLSearchParams(params), { headers });
            if (!resp.ok) {
                throw new Error('Network error');
            }

            return resp.json();
        },
        retry,
        refetchOnWindowFocus: realtime || !preventRefetch,
        refetchOnReconnect: realtime || !preventRefetch,
        refetchOnMount: realtime || !preventRefetch,
        refetchInterval: !realtime ? !preventRefetch : realtimeWindow,
        refetchIntervalInBackground: !preventRefetch,
    });

    useEffect(() => {
        if (!isFetching && error) {
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
