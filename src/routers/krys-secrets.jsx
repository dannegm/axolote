import { createRoute, redirect, Outlet } from '@tanstack/react-router';

import SecretsCards from '@/modules/krystel/pages/secrets/cards/page';
import SecretsEditor from '@/modules/krystel/pages/secrets/editor/page';
import SecretsTools from '@/modules/krystel/pages/secrets/tools/page';
import SecretsLogs from '@/modules/krystel/pages/secrets/logs/page';
import SecretsSettings from '@/modules/krystel/pages/secrets/settings/page';

export const createSecretsRoutes = parentRoute => {
    const secretsRoute = createRoute({
        getParentRoute: () => parentRoute,
        path: '/secrets',
        component: () => <Outlet />,
    });

    const secretsIndexRoute = createRoute({
        getParentRoute: () => secretsRoute,
        path: '/',
        beforeLoad: () => {
            throw redirect({ to: '/krys/secrets/cards', replace: true });
        },
    });

    const cardsRoute = createRoute({
        getParentRoute: () => secretsRoute,
        path: '/cards',
        component: SecretsCards,
    });

    const editorRoute = createRoute({
        getParentRoute: () => secretsRoute,
        path: '/editor',
        component: SecretsEditor,
    });

    const toolsRoute = createRoute({
        getParentRoute: () => secretsRoute,
        path: '/tools',
        component: SecretsTools,
    });

    const logsRoute = createRoute({
        getParentRoute: () => secretsRoute,
        path: '/logs',
        component: SecretsLogs,
    });

    const settingsRoute = createRoute({
        getParentRoute: () => secretsRoute,
        path: '/settings',
        component: SecretsSettings,
    });

    return secretsRoute.addChildren([
        secretsIndexRoute,
        cardsRoute,
        editorRoute,
        toolsRoute,
        logsRoute,
        settingsRoute,
    ]);
};
