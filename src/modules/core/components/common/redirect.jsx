'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Redirect({ to, external, replace, scroll }) {
    const router = useRouter();

    useEffect(() => {
        if (external) {
            window.location.href = to;
        }

        if (!external && replace) {
            router.replace(to, { scroll });
        }

        if (!external && !replace) {
            router.push(to, { scroll });
        }
    }, [to, external, replace, scroll]);

    return <></>;
}
