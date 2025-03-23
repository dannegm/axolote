import useSound from 'use-sound';
import Sparkles from 'react-sparkle';

import { cn } from '@/modules/core/helpers/utils';
import { snowExplosion } from '@/modules/krystel/helpers/particles';

import { useQuote } from '@/modules/krystel/providers/quote-provider';
import { useOverlays } from '@/modules/krystel/providers/overlays-provider';

import usePostAction from '@/modules/krystel/hooks/use-post-action';
import { useEffect } from 'react';

export default function SnowText({ children }) {
    const [playJingle] = useSound('/sounds/jingle-bells.mp3', {
        volume: 0.3,
    });

    const { show } = useOverlays();

    const quote = useQuote();
    const postSnow = usePostAction({ action: 'snow', settings: quote?.settings });

    const handleClick = ev => {
        ev.preventDefault();
        snowExplosion();
        playJingle();
        postSnow();
    };

    useEffect(() => {
        show('snowing');
    }, []);

    return (
        <div
            className='relative inline-flex items-center justify-center cursor-pointer'
            onClick={handleClick}
        >
            <Sparkles color='white' overflowPx={2} maxSize={2} />

            <span
                className={cn(
                    'absolute z-40 mx-auto flex w-fit box-content',
                    'bg-linear-to-b from-sky-900 to-cyan-900 bg-clip-text blur-xs',
                    'font-playwrite font-extrabold text-transparent text-center text-[1em]',
                    'select-none',
                )}
                data-html2canvas-ignore
            >
                {children}
            </span>

            <span
                className={cn(
                    'relative z-10 top-0 w-fit h-auto flex justify-center items-center',
                    'font-playwrite font-extrabold text-sky-600 text-center text-[1em]',
                    'select-auto',
                )}
            >
                {children}
            </span>
        </div>
    );
}
