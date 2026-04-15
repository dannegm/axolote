import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

import { umami } from '@/modules/core/services/umami';

export const TrackersProvider = ({ children }) => {
    const pathname = useRouterState({ select: s => s.location.pathname });
    const searchString = useRouterState({ select: s => s.location.searchStr });

    useEffect(() => {
        umami.track({
            url: `${pathname}?${searchString}`,
            referrer: document.referrer,
            screen: `${window.screen.width}x${window.screen.height}`,
            title: document.title,
        });
    }, []);
    return <>{children}</>;
};
