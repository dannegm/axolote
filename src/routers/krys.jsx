import { createRoute, Outlet } from '@tanstack/react-router';

import Card from '@/modules/krystel/pages/card/page';
import Login from '@/modules/krystel/pages/login/page';
import Cards from '@/modules/krystel/pages/cards/page';
import Posts from '@/modules/krystel/pages/posts/page';
import Test from '@/modules/krystel/pages/test/page';

import { createSecretsRoutes } from './krys-secrets';

export const createKrysRoutes = parentRoute => {
    const krysRoute = createRoute({
        getParentRoute: () => parentRoute,
        path: '/krys',
        component: () => <Outlet />,
    });

    const krysIndexRoute = createRoute({
        getParentRoute: () => krysRoute,
        path: '/',
        component: Card,
    });

    const loginRoute = createRoute({
        getParentRoute: () => krysRoute,
        path: '/login',
        component: Login,
    });

    const cardsRoute = createRoute({
        getParentRoute: () => krysRoute,
        path: '/cards',
        component: Cards,
    });

    const postsRoute = createRoute({
        getParentRoute: () => krysRoute,
        path: '/posts',
        component: Posts,
    });

    const testRoute = createRoute({
        getParentRoute: () => krysRoute,
        path: '/test',
        component: Test,
    });

    return krysRoute.addChildren([
        krysIndexRoute,
        loginRoute,
        cardsRoute,
        postsRoute,
        testRoute,
        createSecretsRoutes(krysRoute),
    ]);
};
