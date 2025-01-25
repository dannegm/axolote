'use client';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <Suspense>{children}</Suspense>
            </QueryClientProvider>
        </NuqsAdapter>
    );
}
