import { useEffect } from 'react';

export default function useScrollPosition({ onTop, onBottom, onScroll, tolerance = 0 }, deps = []) {
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const position = scrollTop;
            const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
            const viewportHeight = window.innerHeight;

            onScroll?.({
                position,
                percent,
                scrollTop,
                scrollHeight,
                clientHeight,
                viewportHeight,
            });

            if (scrollTop <= tolerance) {
                onTop?.({ scrollTop, scrollHeight, clientHeight });
            }

            if (scrollHeight - clientHeight - scrollTop <= tolerance) {
                onBottom?.({ scrollTop, scrollHeight, clientHeight });
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [onTop, onBottom, onScroll, tolerance, ...deps]);
}
