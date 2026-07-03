import {
    createRouter,
    createRoute,
    createRootRoute,
    Outlet,
    redirect,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

import ExternalRedirect from '@/modules/core/components/common/external-redirect';

import { createKrystelRoutes } from './krystel';
import { createKrysRoutes } from './krys';
import { MarkgorithmPage } from '@/modules/markgorithm/page';
import { CarouiuxPage } from '@/modules/carouiux/page';

const DEBUG = import.meta.env.NEXT_PUBLIC_DEBUG === 'true';
const TARGET = import.meta.env.NEXT_PUBLIC_TARGET || 'https://danielgarcia.me/';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
                <Outlet />
            </NuqsAdapter>
        </QueryClientProvider>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: () => {
        if (DEBUG) {
            throw redirect({ to: '/krys', replace: true });
        }
    },
    component: () => <ExternalRedirect to={TARGET} />,
});

const markgorithmRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/markgorithm',
    component: MarkgorithmPage,
});

const carouiuxRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/carouiux',
    component: CarouiuxPage,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    markgorithmRoute,
    carouiuxRoute,
    createKrystelRoutes(rootRoute),
    createKrysRoutes(rootRoute),
]);

export const router = createRouter({ routeTree });
