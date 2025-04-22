import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { TrackersProvider } from './trackers-provider';

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <NuqsAdapter>
            <TrackersProvider>
                <QueryClientProvider client={queryClient}>
                    <Suspense>{children}</Suspense>
                </QueryClientProvider>
            </TrackersProvider>
        </NuqsAdapter>
    );
}
