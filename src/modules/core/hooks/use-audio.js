import { useEffect, useRef } from 'react';

export default function useAudio({
    src,
    volume = 1,
    autoplay = false,
    loop = false,
    fadeIn = 0,
    fadeOut = 0,
}) {
    const audioRef = useRef(new Audio(src));
    const audio = audioRef.current;

    useEffect(() => {
        audio.loop = loop;
        audio.volume = fadeIn > 0 ? 0 : volume;
        if (autoplay) play();
    }, []);

    const play = () => {
        if (fadeIn > 0) {
            let currentStep = 0;
            const steps = fadeIn / 10;
            const fadeInterval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                audio.volume = Math.min(volume * Math.pow(progress, 2), volume);
                if (currentStep >= steps) {
                    audio.volume = volume;
                    clearInterval(fadeInterval);
                }
            }, 10);
        }
        audio.play();
    };

    const pauseStop = stop => {
        if (stop) {
            audio.currentTime = 0;
        }
        audio.pause();
    };

    const pause = (stop = false) => {
        if (fadeOut > 0) {
            let currentStep = 0;
            const steps = fadeOut / 10;
            const fadeInterval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                audio.volume = Math.max(volume * (1 - Math.pow(progress, 2)), 0);
                if (currentStep >= steps) {
                    audio.volume = 0;
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
