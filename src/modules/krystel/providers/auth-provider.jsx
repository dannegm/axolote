import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import { verifyAuthQuery } from '@/modules/krystel/queries/queries';

export default function AuthProvider({ children }) {
    const [token, setToken] = useLocalStorage('app:tracker', null);
    const navigate = useNavigate();

    const { isLoading, isError } = useQuery(verifyAuthQuery({ token, retry: false }));

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
