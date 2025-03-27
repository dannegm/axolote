import { useEffect } from 'react';
import { Redirect } from 'wouter';
import { useQuery } from '@tanstack/react-query';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import Loader from '@/modules/core/components/common/loader';

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

    const { isLoading, isError } = useQuery({
        queryKey: ['cards', 'posts'],
        queryFn: verifyAuthAction({ token }),
        retry: false,
    });

    useEffect(() => {
        if (isError) setToken(null);
    }, []);

    if (isLoading) {
        return <></>;
    }

    if (!token || isError) {
        return <Redirect to='/krystel/login' replace />;
    }

    return children;
}
