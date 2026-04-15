import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';

const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

const verifyAuthAction =
    ({ token }) =>
    async () => {
        const url = `${HOSTNAME}/auth/validate`;
        const resp = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-dnn-tracker': token,
            },
        });

        if (!resp.ok) {
            throw new Error('Error logging in');
        }

        return resp.json();
    };

export default function AuthProvider({ children }) {
    const [token, setToken] = useLocalStorage('app:tracker', null);
    const navigate = useNavigate();

    const { isLoading, isError } = useQuery({
        queryKey: ['cards', 'posts'],
        queryFn: verifyAuthAction({ token }),
        retry: false,
    });

    useEffect(() => {
        if (isError) setToken(null);
    }, []);

    useEffect(() => {
        if (!isLoading && (!token || isError)) {
            navigate({ to: '/krys/login', replace: true });
        }
    }, [isLoading, token, isError]);

    if (isLoading) {
        return <></>;
    }

    if (!token || isError) {
        return null;
    }

    return children;
}
