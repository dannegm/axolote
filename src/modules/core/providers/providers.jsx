'use client';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense>{children}</Suspense>
        </QueryClientProvider>
    );
}
