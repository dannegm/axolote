import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import ToastProvider from './toast-provider';

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <ToastProvider>
                    <Suspense>{children}</Suspense>
                </ToastProvider>
            </QueryClientProvider>
        </NuqsAdapter>
    );
}
