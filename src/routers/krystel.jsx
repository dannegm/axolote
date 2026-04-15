import { createRoute } from '@tanstack/react-router';

import Unavailable from '@/modules/krystel/pages/unavailable/page';

export const createKrystelRoutes = parentRoute => {
    const krystelRoute = createRoute({
        getParentRoute: () => parentRoute,
        path: '/krystel',
        component: Unavailable,
    });

    return krystelRoute;
};
