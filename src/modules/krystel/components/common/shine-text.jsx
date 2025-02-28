'use client';
import useSound from 'use-sound';
import Sparkles from 'react-sparkle';

import { cn } from '@/modules/core/helpers/utils';
import usePostAction from '@/modules/krystel/hooks/use-post-action';
import { useQuote } from '@/modules/krystel/providers/quote-provider';
import { starsExplosion } from '@/modules/krystel/helpers/particles';

export default function ShineText({ children }) {
    const [playShine] = useSound('/sounds/shine.mp3', {
        volume: 0.3,
    });

    const quote = useQuote();
    const postShine = usePostAction({ action: 'shine', settings: quote?.settings });

    const handleClick = ev => {
        ev.preventDefault();
        starsExplosion();
        playShine();
        postShine();
    };

    return (
        <div className='relative inline-flex items-center justify-center' onClick={handleClick}>
            <Sparkles color='purple' overflowPx={2} maxSize={2} />

            <span
                className={cn(
                    'absolute z-40 mx-auto flex w-fit box-content',
                    'bg-linear-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text blur-xs',
                    'font-dosis font-extrabold text-transparent text-center  text-[1.3rem]',
                    'select-none',
                )}
                data-html2canvas-ignore
            >
                {children}
            </span>
            <span
                className={cn(
                    'absolute z-50 mx-auto flex w-fit box-content',
                    'bg-linear-to-r from-blue-500 to-pink-500 bg-clip-text',
                    'font-dosis font-extrabold text-transparent text-center  text-[1.3rem]',
                    'select-none',
                )}
                data-html2canvas-ignore
            >
                {children}
            </span>
            <span
                className={cn(
                    'relative z-10 top-0 w-fit h-auto flex justify-center items-center',
                    'font-dosis font-extrabold text-violet-500 text-center  text-[1.3rem]',
                    'select-auto',
                )}
            >
                {children}
            </span>
        </div>
    );
}
