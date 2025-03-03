'use client';
import useSound from 'use-sound';
import Sparkles from 'react-sparkle';
import Snowfall from 'react-snowfall';

import { cn } from '@/modules/core/helpers/utils';
import Portal from '@/modules/core/components/common/portal';
import Audio from '@/modules/core/components/common/audio';

import { snowExplosion } from '@/modules/krystel/helpers/particles';
import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';

export default function SnowText({ children }) {
    const [playJingle] = useSound('/sounds/jingle-bells.mp3', {
        volume: 0.3,
    });

    const quote = useQuote();
    const postSnow = usePostAction({ action: 'snow', settings: quote?.settings });

    const snowFallConfig = {
        color: '#ffffff',
        snowflakeCount: 320,
        speed: [0.5, 2.5],
        wind: [-0.5, 0.5],
        radius: [1.5, 3.5],
    };

    const handleClick = ev => {
        ev.preventDefault();
        snowExplosion();
        playJingle();
        postSnow();
    };

    return (
        <div className='relative inline-flex items-center justify-center cursor-pointer' onClick={handleClick}>
            <Sparkles color='white' overflowPx={2} maxSize={2} />

            <Portal portalId='global-bg-portal'>
                <style>
                    {
                        /* css */ `
                        .background {
                            filter: brightness(1) contrast(1) sepia(1) saturate(1) hue-rotate(180deg);
                        }
                        .gift-card {
                            filter: brightness(1) contrast(1) sepia(1) saturate(3) hue-rotate(180deg);
                        }
                    `
                    }
                </style>
                <div
                    className={cn(
                        'animate-in fade-in-0 duration-150 ease-in opacity-50',
                        'fixed inset-0 pointer-events-none bg-slate-900 transition-all duration-150 backdrop-blur-lg opacity-50',
                    )}
                />
                <div
                    className={cn(
                        'animate-in fade-in-0 duration-300 ease-in opacity-100',
                        'fixed inset-0 z-max pointer-events-none',
                    )}
                >
                    <Snowfall {...snowFallConfig} />
                </div>
            </Portal>

            <Audio src='./sounds/chimes.mp3' volume={0.035} autoplay loop />

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
