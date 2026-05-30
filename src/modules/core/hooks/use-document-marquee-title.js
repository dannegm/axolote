import { useEffect } from 'react';

export const useDocumentMarqueeTitle = (title, { speed = 200, gap = 10 } = {}) => {
    useEffect(() => {
        const prev = document.title;
        const padded = `${title}${' '.repeat(gap)}`;
        let pos = 0;

        const tick = () => {
            document.title = padded.slice(pos) + padded.slice(0, pos);
            pos = (pos + 1) % padded.length;
        };

        tick();
        const id = setInterval(tick, speed);

        return () => {
            clearInterval(id);
            document.title = prev;
        };
    }, [title, speed]);
};
