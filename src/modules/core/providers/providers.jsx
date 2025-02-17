'use client';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import ToastProvider from './toast-provider';

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <Analytics />
                <ToastProvider>
                    <Suspense>{children}</Suspense>
                </ToastProvider>
            </QueryClientProvider>
        </NuqsAdapter>
    );
}
