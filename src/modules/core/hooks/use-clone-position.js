import { useLayoutEffect, useRef, useState } from 'react';

export default function useClonePosition() {
    const ref = useRef(null);
    const [rectStyles, setRectStyles] = useState({ top: 0, left: 0 });

    useLayoutEffect(() => {
        const updatePosition = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setRectStyles({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                });
            }
        };

        updatePosition();
        setTimeout(updatePosition, 100);
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, []);

    return [ref, rectStyles];
}
