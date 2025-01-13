import { useQuery } from '@tanstack/react-query';

export default function DataLoader({ url, params, tags = [], children = () => null } = {}) {
    const { data, error, isLoading } = useQuery({
        queryKey: tags,
        queryFn: async () => {
            const resp = await fetch(url + new URLSearchParams(params));
            if (!resp.ok) {
                throw new Error('Network error');
            }

            return resp.json();
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return children(data);
}
