import { createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';

import ExternalRedirect from '@/modules/core/components/common/external-redirect';

import { createKrystelRoutes } from './krystel';
import { createKrysRoutes } from './krys';

const DEBUG = import.meta.env.NEXT_PUBLIC_DEBUG === 'true';
const TARGET = import.meta.env.NEXT_PUBLIC_TARGET || 'https://danielgarcia.me/';

const rootRoute = createRootRoute({
    component: () => <Outlet />,
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

const routeTree = rootRoute.addChildren([
    indexRoute,
    createKrystelRoutes(rootRoute),
    createKrysRoutes(rootRoute),
]);

export const router = createRouter({ routeTree });
