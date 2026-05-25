import { Suspense } from 'react';

export default function Providers({ children }) {
    return <Suspense>{children}</Suspense>;
}
