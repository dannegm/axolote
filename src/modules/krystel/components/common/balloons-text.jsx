'use client';
import { useState } from 'react';

import { cn } from '@/modules/core/helpers/utils';
import { randomPick } from '@/modules/core/helpers/arrays';
import useAudio from '@/modules/core/hooks/use-audio';
import Portal from '@/modules/core/components/common/portal';

import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';

import Balloons from './balloons';

const colors = [
    'text-red-500',
    'text-yellow-500',
    'text-blue-500',
    'text-green-500',
    'text-purple-500',
];

export const BalloonsTextSimple = ({ children }) => {
    return (
        <span className={cn('font-boogaloo font-extrabold text-[1.15rem]')}>
            {children.split('').map((letter, index) => (
                <span key={`balloon-letter-${letter}-${index}`} className={cn(randomPick(colors))}>
                    {letter}
                </span>
            ))}
        </span>
    );
};

export default function BalloonsText({ children }) {
    const [showBalloons, setShowBalloons] = useState(false);

    const [playSound, pauseSound] = useAudio({
        src: './sounds/little-happy-tune.mp3',
        volume: 0.3,
        fadeIn: 1500,
        fadeOut: 1500,
        loop: true,
    });

    const quote = useQuote();

    const postBalloonsComplete = usePostAction({
        action: 'balloons',
        settings: quote.settings,
    });

    const postBalloonsStart = usePostAction({
        action: 'balloons-start',
        settings: quote.settings,
    });

    const handleClick = ev => {
        ev.preventDefault();
        if (!showBalloons) {
            setShowBalloons(true);
            postBalloonsStart();
            playSound();
        }
    };

    const handleBalloonsComplete = () => {
        pauseSound(true);
        setShowBalloons(false);
        postBalloonsComplete();

        setTimeout(() => {
            window.location.href = '/krystel?code=128:6:23:20:2';
        }, 1500);
    };

    return (
        <div
            className='relative inline-flex items-center justify-center active:scale-95'
            onClick={handleClick}
        >
            <Portal portalId='global-bg-portal'>
                {showBalloons && <Balloons count={6} onPopAll={handleBalloonsComplete} loop />}
            </Portal>

            <span
                className={cn(
                    'absolute z-40 mx-auto flex w-fit box-content',
                    'bg-linear-to-b from-yellow-900 to-red-900 bg-clip-text blur-md brightness-150',
                    'font-boogaloo font-extrabold text-transparent text-center text-[1.5rem]',
                    'select-none',
                )}
                data-html2canvas-ignore
            >
                {children}
            </span>

            <span
                className={cn(
                    'relative z-10 top-0 w-fit h-auto flex justify-center items-center',
                    'font-boogaloo font-extrabold text-center text-[1.5rem]',
                    'select-auto',
                )}
            >
                {children.split('').map((letter, index) => (
                    <span
                        key={`balloon-letter-${letter}-${index}`}
                        className={cn(randomPick(colors))}
                    >
                        {letter}
                    </span>
                ))}
            </span>
        </div>
    );
}
