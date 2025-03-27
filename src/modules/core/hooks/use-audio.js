import { useEffect, useRef } from 'react';

export default function useAudio({
    src,
    volume = 1,
    autoplay = false,
    loop = false,
    fadeIn = 0,
    fadeOut = 0,
}) {
    const $audio = useRef();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            $audio.current = new Audio(src);
            $audio.current.loop = loop;
            $audio.current.volume = fadeIn > 0 ? 0 : volume;
            if (autoplay) play();
        }
    }, [src]);

    useEffect(() => {
        return () => {
            $audio.current?.pause?.();
            $audio.current = null;
        };
    }, []);

    const play = () => {
        if (!$audio?.current) return;
        if (fadeIn > 0) {
            let currentStep = 0;
            const steps = fadeIn / 10;
            const fadeInterval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                $audio.current.volume = Math.min(volume * Math.pow(progress, 2), volume);
                if (currentStep >= steps) {
                    $audio.current.volume = volume;
                    clearInterval(fadeInterval);
                }
            }, 10);
        }
        $audio.current.play();
    };

    const pauseStop = stop => {
        if (!$audio?.current) return;
        if (stop) {
            $audio.current.currentTime = 0;
        }
        $audio.current.pause();
    };

    const pause = (stop = false) => {
        if (!$audio?.current) return;
        if (fadeOut > 0) {
            let currentStep = 0;
            const steps = fadeOut / 10;
            const fadeInterval = setInterval(() => {
                if (!$audio?.current) {
                    clearInterval(fadeInterval);
                    return;
                }

                currentStep++;
                const progress = currentStep / steps;
                $audio.current.volume = Math.max(volume * (1 - Math.pow(progress, 2)), 0);
                if (currentStep >= steps) {
                    $audio.current.volume = 0;
                    pauseStop(stop);
                    clearInterval(fadeInterval);
                }
            }, 10);
        } else {
            pauseStop(stop);
        }
    };

    return [play, pause];
}
