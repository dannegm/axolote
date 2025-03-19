import { useLayoutEffect, useRef } from 'react';

export default function Audio({ src, volume = 1, autoplay = false, loop = false, fadeIn = 0 }) {
    const $audio = useRef(null);

    useLayoutEffect(() => {
        const audio = $audio.current;
        if (!audio) return;

        if (fadeIn > 0) {
            audio.volume = 0;
            const steps = fadeIn / 10; // Número de pasos en 100ms intervalos
            let currentStep = 0;

            const fadeInterval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                audio.volume = Math.min(volume * Math.pow(progress, 2), volume); // Ease-in cuadrático

                if (currentStep >= steps) {
                    audio.volume = volume;
                    clearInterval(fadeInterval);
                }
            }, 10);
        } else {
            audio.volume = volume;
        }
    }, [$audio.current]);

    return <audio ref={$audio} src={src} loop={loop} autoPlay={autoplay} />;
}
