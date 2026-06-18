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

    const setupRoute = createRoute({
        getParentRoute: () => secretsRoute,
        path: '/setup',
        beforeLoad: () => {
            const defaults = {
                'app:tracker': '54534e9a5e505971396bd596f9ecbac25d4a0fdc94dba3d4e9c4ef498c931ff1',
                'settings:show_secrets': true,
                'settings:show_quick_settings': true,
                'settings:logs:show': true,
                'settings:logs:realtime': true,
                'settings:skip_actions': true,
                'settings:show_breakpoint_indicator': false,
                'settings:cards:includes_future': true,
                'settings:cards:includes_deleted': true,
                'settings:posts:indev': true,
                'settings:posts:includes_indev': true,
                'settings:posts:includes_deleted': true,
                'editor:content': '',
                'editor:configs': {},
            };
            for (const [key, value] of Object.entries(defaults)) {
                localStorage.setItem(key, JSON.stringify(value));
            }
            throw redirect({ to: '/krys/secrets', replace: true });
        },
    });

    return secretsRoute.addChildren([
        secretsIndexRoute,
        cardsRoute,
        editorRoute,
        toolsRoute,
        logsRoute,
        settingsRoute,
        setupRoute,
    ]);
};
