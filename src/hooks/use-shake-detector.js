import useDebouncedCallback from '@/app/hooks/use-debounced-callback';
import { useEffect } from 'react';

const useShakeDetector = (onShake, threshold = 15) => {
    const debouncedOnShake = useDebouncedCallback(() => onShake?.(), 1000);

    useEffect(() => {
        let lastX = null,
            lastY = null,
            lastZ = null;

        let timeout;

        const handleMotion = event => {
            const { accelerationIncludingGravity } = event;
            if (!accelerationIncludingGravity) return;

            const { x, y, z } = accelerationIncludingGravity;

            if (lastX !== null && lastY !== null && lastZ !== null) {
                const deltaX = Math.abs(x - lastX);
                const deltaY = Math.abs(y - lastY);
                const deltaZ = Math.abs(z - lastZ);

                if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
                    debouncedOnShake();
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {}, 500);
                }
            }

            lastX = x;
            lastY = y;
            lastZ = z;
        };

        window.addEventListener('devicemotion', handleMotion);

        return () => {
            window.removeEventListener('devicemotion', handleMotion);
        };
    }, [onShake, threshold]);
};

export default useShakeDetector;
