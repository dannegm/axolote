'use client';

import { useState } from 'react';
import useSound from 'use-sound';

import { cn } from '@/helpers/utils';

export default function SpoilerText({ children }) {
    const [playHush] = useSound('./sounds/shush.mp3');
    const [hidden, setHidden] = useState(true);

    const handleClick = ev => {
        setHidden(!hidden);
        playHush();
    };

    return (
        <span
            className={cn(
                'relative z-50 cursor-pointer bg-purple-400 text-white rounded-md px-1 box-decoration-clone transition-all duration-500',
                { 'blur-sm': hidden },
            )}
            onClick={handleClick}
        >
            {children}
        </span>
    );
}
