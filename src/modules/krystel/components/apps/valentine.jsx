'use client';
import { useState } from 'react';

import { randomPickWithMemory } from '@/modules/core/helpers/arrays';
import useAudio from '@/modules/core/hooks/use-audio';
import Portal from '@/modules/core/components/common/portal';

import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';

import Frame from './frame';
import Balloons from '../common/balloons';

const initialSlide = {
    question: '¿Te gustaría ser mi san valentín?',
    yesLabel: 'Sí quiero',
    noLabel: 'No quiero',
    image: '/apps/valentine/peach-goma-1.gif',
};

const finalSlide = {
    question: 'Sabía que íbas a decir que sí.',
    image: '/apps/valentine/peach-goma-0.gif',
};

const slides = [
    {
        question: '¿Estás segura que no quieres serlo?',
        yesLabel: 'Está bien',
        noLabel: 'Estoy segura',
        image: '/apps/valentine/peach-goma-2.gif',
    },
    {
        question: 'Pero nos vamos a divertir mucho',
        yesLabel: 'Ok, acepto',
        noLabel: 'Te dije que no',
        image: '/apps/valentine/peach-goma-3.gif',
    },
    {
        question: 'Podremos conocer la nieve juntos ☃️',
        yesLabel: 'Entonces sí',
        noLabel: 'Que no!',
        image: '/apps/valentine/peach-goma-4.gif',
    },
    {
        question: 'Viajaremos en tren y conoceremos nuevos lugares',
        yesLabel: 'Suena tentador',
        noLabel: 'Ni loca',
        image: '/apps/valentine/peach-goma-7.gif',
    },
    {
        question: 'Por fiiiisss, te voy a querer mucho',
        yesLabel: 'Super sí ✨',
        noLabel: 'No gracias',
        image: '/apps/valentine/peach-goma-5.gif',
    },
    {
        question: 'Anda, yo sé que también tú quieres',
        yesLabel: 'Me descubriste',
        noLabel: 'Obvio no',
        image: '/apps/valentine/peach-goma-4.gif',
    },
    {
        question: 'Te haré muy feliz, lo prometo',
        yesLabel: 'Bueno sí',
        noLabel: '...',
        image: '/apps/valentine/peach-goma-1.gif',
    },
    {
        question: 'La pasaremos muy bien juntos',
        yesLabel: 'Me agrada',
        noLabel: 'Paso',
        image: '/apps/valentine/peach-goma-3.gif',
    },
    {
        question: 'Voy a seguir insistiendo eh!',
        yesLabel: 'Diré que sí',
        noLabel: 'Basta!',
        image: '/apps/valentine/peach-goma-6.gif',
    },
    {
        question: 'Krysteeeeeeeeellll...',
        yesLabel: 'Ya pues, sí',
        noLabel: 'Nooooooo',
        image: '/apps/valentine/peach-goma-7.gif',
    },
];

export default function Valentine({}) {
    const [saidYes, setSaidYes] = useState(false);
    const [slide, setSlide] = useState(initialSlide);

    const [playSound, pauseSound] = useAudio({
        src: '/sounds/little-happy-tune.mp3',
        volume: 0.3,
        fadeIn: 1500,
        fadeOut: 1500,
        loop: true,
    });

    const quote = useQuote();
    const postSaidYes = usePostAction({ action: 'said_yes', settings: quote.settings });

    const handleYes = () => {
        setSlide(finalSlide);
        setSaidYes(true);
        playSound();
        postSaidYes();
    };

    const handleNo = () => {
        const pickSlide = randomPickWithMemory(slides);
        setSlide(pickSlide());
        setSaidYes(false);
    };

    const handleBalloonsComplete = () => {
        pauseSound();
    };

    return (
        <Frame className='bg-pink-100 px-2 py-4 rounded-2xl shadow-sm'>
            {saidYes && (
                <div className='flex flex-col gap-4 items-center'>
                    <Portal portalId='global-bg-portal'>
                        <Balloons count={6} onPopAll={handleBalloonsComplete} loop />
                    </Portal>

                    <img className='block h-[100px]' src={slide.image} />
                    <div className='text-[1rem] font-bold text-balance px-2'>{slide.question}</div>
                </div>
            )}

            {!saidYes && (
                <div className='flex flex-col gap-4 items-center'>
                    <div className='text-[1rem] font-bold text-balance px-2'>{slide.question}</div>
                    <img className='block h-[100px]' src={slide.image} />
                    <div className='flex flex-row gap-2 justify-center'>
                        <button
                            className='min-w-10 px-2 py-0.5 bg-cyan-500 text-white text-sm text-center rounded-full shadow-sm transition-all duration-150 active:scale-95'
                            type='button'
                            onClick={handleNo}
                        >
                            {slide.noLabel || 'No'}
                        </button>
                        <button
                            className='min-w-10 px-2 py-0.5 bg-rose-500 text-white text-sm text-center rounded-full shadow-sm transition-all duration-150 active:scale-95'
                            type='button'
                            onClick={handleYes}
                        >
                            {slide.yesLabel || 'Sí'}
                        </button>
                    </div>
                </div>
            )}
        </Frame>
    );
}
