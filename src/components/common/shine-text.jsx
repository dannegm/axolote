'use client';
import useSound from 'use-sound';
import Sparkles from 'react-sparkle';
import { cn } from '@/helpers/utils';
import { startsExplosion } from '@/helpers/particles';

export default function ShineText({ children }) {
    const [playShine] = useSound('./sounds/shine.mp3', {
        volume: 0.3,
    });

    const handleClick = ev => {
        ev.preventDefault();
        startsExplosion();
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
                    'font-extrabold text-violet-500 text-center',
                    'select-auto',
                )}
            >
                {children}
            </span>
        </div>
    );
}
