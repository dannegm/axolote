import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function DataLoader({
    url,
    params,
    tags = [],
    loader = null,
    preventRefetch = false,
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
        refetchOnWindowFocus: !preventRefetch,
        refetchOnReconnect: !preventRefetch,
        refetchOnMount: !preventRefetch,
        refetchInterval: !preventRefetch,
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
