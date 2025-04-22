import { useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';

import { umami } from '@/modules/core/services/umami';

export const TrackersProvider = ({ children }) => {
    const [pathname] = useLocation();
    const searchString = useSearch();

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
