'use client';

import { useState } from 'react';
import useSound from 'use-sound';

import { cn } from '@/helpers/utils';
import useShakeDetector from '@/hooks/use-shake-detector';

export default function SpoilerText({ children }) {
    const [playHush] = useSound('./sounds/shush.mp3');
    const [hidden, setHidden] = useState(true);

    const toggleSpoiler = ev => {
        setHidden(!hidden);
        playHush();
    };

    useShakeDetector(toggleSpoiler);

    return (
        <span
            className={cn(
                'cursor-pointer px-1 font-extrabold text-fuchsia-500 transition-all duration-500',
                { 'blur-md bg-fuchsia-500 rounded-md box-decoration-clone': hidden },
            )}
            onClick={toggleSpoiler}
        >
            {children}
        </span>
    );
}
