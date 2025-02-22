import { useEffect } from 'react';

export default function useScrollPosition(
    { onTop, onBottom, onScrollPosition, onScrollPercentage, tolerance = 0 },
    deps = [],
) {
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const positionPx = scrollTop;
            const positionPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

            onScrollPosition?.(positionPx);
            onScrollPercentage?.(positionPercent);

            if (scrollTop <= tolerance) {
                onTop?.();
            }

            if (scrollHeight - clientHeight - scrollTop <= tolerance) {
                onBottom?.();
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [onTop, onBottom, onScrollPosition, onScrollPercentage, tolerance, ...deps]);
}
