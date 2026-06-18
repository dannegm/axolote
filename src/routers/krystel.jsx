import { createRoute, redirect } from '@tanstack/react-router';

export const createKrystelRoutes = parentRoute => {
    const krystelRoute = createRoute({
        getParentRoute: () => parentRoute,
        path: '/krystel',
        beforeLoad: () => {
            throw redirect({ to: '/krys', replace: true });
        },
    });

    return krystelRoute;
};
