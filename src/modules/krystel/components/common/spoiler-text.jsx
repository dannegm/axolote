'use client';

import { useState } from 'react';
import useSound from 'use-sound';

import { cn } from '@/modules/core/helpers/utils';
import useShakeDetector from '@/modules/core/hooks/use-shake-detector';

import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';

export default function SpoilerText({ inPreview = false, preventReveal = false, children }) {
    const [playHush] = useSound('/sounds/shush.mp3');
    const [hidden, setHidden] = useState(true);

    const quote = useQuote();
    const postReveal = usePostAction({ action: 'reveal', settings: quote?.settings });

    const toggleSpoiler = ev => {
        if (preventReveal) return;

        setHidden(!hidden);
        playHush();

        if (!inPreview) {
            postReveal();
        }

        ev.preventDefault();
        ev.stopPropagation();
    };

    useShakeDetector(() => {
        if (inPreview || preventReveal) {
            return;
        }

        toggleSpoiler();
    });

    return (
        <span
            className={cn(
                'cursor-pointer font-quicksand font-extrabold text-fuchsia-500 transition-all duration-500 rounded-md decoration-clone',
                { 'bg-fuchsia-500 blur-sm select-none': hidden },
            )}
            onClick={toggleSpoiler}
        >
            {children}
        </span>
    );
}
