'use client';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { confetti } from '@tsparticles/confetti';
import { Heart } from 'lucide-react';
import useSound from 'use-sound';

import ntfy from '@/services/ntfy';

const buildBody = ({ scheme, quote, bg, border, icon }) => `
> ${quote}
--
**Icon**: ${icon}
**Scheme**: ${scheme}
**BG**: ${bg}
**Border**: ${border}
`;

const heartExplosion = () => {
    const defaults = {
        angle: 90,
        position: { x: 50, y: 100 },
        spread: 360,
        startVelocity: 30,
        decay: 0.94,
        gravity: 1,
        drift: 0,
        ticks: 100,
        colors: [
            '#FF4C4C', // Strong Red
            '#FF69B4', // Hot Pink
            '#DB7093', // Pale Violet Red
            '#FF6F91', // Soft Red Pink
            '#C71585', // Medium Violet Red
            '#D670DA', // Orchid
            '#DDA0DD', // Plum
            '#E68FAC', // Pink Flamingo
            '#E64A56', // Redder Pink
            '#F08080', // Light Coral
        ],
        shapes: ['heart'],
        zIndex: 2000,
        disableForReducedMotion: true,
    };

    confetti('tsparticles', {
        ...defaults,
        count: 50,
        scalar: 2,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 25,
        scalar: 3,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 10,
        scalar: 4,
    });
};

export default function LikeButton({ scheme, quote, bg, border, icon }) {
    const $ref = useRef(null);
    const [playPop] = useSound('./pop.mp3');
    const mutation = useMutation({
        mutationFn: data => ntfy.pushRich(data),
        onMutate: () => {
            heartExplosion($ref.current);
            playPop();
        },
    });

    const handleButtonClick = ev => {
        ev.preventDefault();
        mutation.mutate({
            title: 'Krystel liked',
            message: buildBody({ scheme, quote, bg, border, icon }),
            tags: 'heart',
        });
    };

    return (
        <button
            ref={$ref}
            type='button'
            className='flex flex-row gap-2 justify-center items-center px-6 py-3 rounded-full w-14 h-14 shadow-md bg-red-500 text-white hover:shadow-lg hover:bg-red-600 active:shadow-sm transition-all duration-200 hover:scale-125 active:scale-100'
            onClick={handleButtonClick}
        >
            <div className='block'>
                <Heart size={20} />
            </div>
        </button>
    );
}
