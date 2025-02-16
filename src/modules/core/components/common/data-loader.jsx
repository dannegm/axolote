import { useQuery } from '@tanstack/react-query';

export default function DataLoader({
    url,
    params,
    tags = [],
    loader = null,
    preventRefetch = false,
    children = () => null,
} = {}) {
    const { data, error, isLoading } = useQuery({
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

    if (isLoading) {
        return loader || <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return children(data);
}
