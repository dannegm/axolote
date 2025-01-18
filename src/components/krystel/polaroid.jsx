'use client';
import { useLayoutEffect, useState } from 'react';
import useSound from 'use-sound';
import useShakeDetector from '@/hooks/use-shake-detector';
import usePostAction from '@/hooks/use-post-action';
import { useQuote } from '@/providers/quote-provider';
import { cn } from '@/helpers/utils';

export default function Polaroid({ url, description }) {
    const [playHush] = useSound('./sounds/shush.mp3');
    const [hidden, setHidden] = useState(true);

    const [rotation, setRotation] = useState('');

    const rotations = ['rotate-[-6deg]', 'rotate-[6deg]', 'rotate-[-3deg]', 'rotate-[3deg]'];

    const quote = useQuote();
    const postReveal = usePostAction({ action: 'reveal', settings: quote.settings });

    const rotate = () => {
        const rng = Math.floor(Math.random() * rotations.length);
        setRotation(rotations[rng]);
    };

    const toggleReveal = () => {
        setHidden(!hidden);
        playHush();
        postReveal();
        rotate();
    };

    useShakeDetector(toggleReveal);

    useLayoutEffect(() => {
        rotate();
    }, []);

    return (
        <div className='-mt-20' onClick={toggleReveal}>
            <figure
                className={cn(
                    'flex flex-col gap-2 bg-white p-2 mt-4 mb-4 -rotate-6 scale-150 shadow-md transition-all',
                    'md:scale-[1.7]',
                    rotation,
                )}
            >
                <div className='bg-slate-700 overflow-hidden'>
                    <img
                        className={cn(
                            'object-cover w-28 aspect-[3/4] transition-all duration-1000',
                            {
                                'blur-2xl': hidden,
                            },
                        )}
                        src={url}
                        alt=''
                    />
                    <span
                        className={cn(
                            'absolute inset-0 flex items-center justify-center -mt-8 text-center text-xs text-white font-sans font-bold opacity-40 transition-all',
                            {
                                'opacity-0': !hidden,
                            },
                        )}
                        data-html2canvas-ignore
                    >
                        agita.
                    </span>
                </div>
                <figcaption className='w-28 text-center text-[0.5rem]'>{description}</figcaption>
            </figure>
        </div>
    );
}
