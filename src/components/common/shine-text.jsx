'use client';
import { cn } from '@/helpers/utils';
import Sparkles from 'react-sparkle';
import useSound from 'use-sound';

const heartExplosion = () => {
    const defaults = {
        angle: 90,
        position: { x: 50, y: 50 },
        spread: 360,
        startVelocity: 30,
        decay: 0.94,
        gravity: 1,
        drift: 0,
        ticks: 100,
        colors: [
            '#EC4899', // Pink 500 (Tailwind)
            '#F472B6', // Pink 400 (Tailwind)
            '#D946EF', // Purple 500 (Tailwind)
            '#9F7AEA', // Purple 400 (Tailwind)
            '#14B8A6', // Teal 500 (Tailwind)
            '#2DD4BF', // Teal 400 (Tailwind)
            '#3B82F6', // Blue 500 (Tailwind)
            '#60A5FA', // Blue 400 (Tailwind)
            '#93C5FD', // Blue 300 (Tailwind)
        ],
        shapes: ['star'],
        zIndex: 2000,
        disableForReducedMotion: true,
    };

    confetti('tsparticles', {
        ...defaults,
        count: 50,
        scalar: 1,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 25,
        scalar: 2,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 10,
        scalar: 3,
    });
};

export default function ShineText({ children }) {
    const [playShine] = useSound('./sounds/shine.mp3');

    const handleClick = ev => {
        ev.preventDefault();
        heartExplosion();
        playShine();
    };

    return (
        <div className='relative inline-flex items-center justify-center' onClick={handleClick}>
            <Sparkles color='purple' overflowPx={2} maxSize={2} />

            <span
                className={cn(
                    'absolute z-40 mx-auto flex w-fit box-content',
                    'bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text blur-sm',
                    'font-extrabold text-transparent text-center',
                    'select-none',
                )}
                data-html2canvas-ignore
            >
                {children}
            </span>
            <span
                className={cn(
                    'absolute z-50 mx-auto flex w-fit box-content',
                    'bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text',
                    'font-extrabold text-transparent text-center',
                    'select-none',
                )}
                data-html2canvas-ignore
            >
                {children}
            </span>
            <span
                className={cn(
                    'relative z-10 top-0 w-fit h-auto flex justify-center items-center',
                    'font-extrabold text-teal-500 text-center',
                    'select-auto',
                )}
            >
                {children}
            </span>
        </div>
    );
}
