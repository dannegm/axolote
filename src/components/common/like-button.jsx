'use client';

import useSound from 'use-sound';
import { useMutation } from '@tanstack/react-query';
import { Heart } from 'lucide-react';

import { heartsExplosion } from '@/helpers/particles';

import useDebouncedCallback from '@/app/hooks/use-debounced-callback';

const postAction = async ({ action, quoteId, settings }) => {
    const url = `https://endpoints.hckr.mx/quotes/krystel/${quoteId}/action/${action}?code=${settings}`;
    const response = await fetch(url, { method: 'POST' });
    return response.json();
};

export const LikeHandler = ({ settings, type = 'single', children }) => {
    const [playPop] = useSound('./sounds/pop.mp3');

    const mutation = useMutation({
        mutationFn: postAction,
    });

    const pushNotification = useDebouncedCallback(() => {
        const [quoteId] = settings.split(':');
        mutation.mutate({ action: 'like', quoteId, settings });
    }, 1000);

    const handleButtonClick = ev => {
        ev.preventDefault();
        pushNotification();
        heartsExplosion({ position: 'bottomCenter' });
        playPop();
    };

    if (type === 'double') {
        return <div onDoubleClick={handleButtonClick}>{children}</div>;
    }

    return <div onClick={handleButtonClick}>{children}</div>;
};

export default function LikeButton({ quote, settings }) {
    return (
        <LikeHandler quote={quote} settings={settings}>
            <button
                type='button'
                className='flex flex-row gap-2 justify-center items-center px-6 py-3 rounded-full w-14 h-14 shadow-md bg-red-500 text-white hover:shadow-lg hover:bg-red-600 active:shadow-sm transition-all duration-200 hover:scale-125 active:scale-100'
            >
                <div className='block'>
                    <Heart size={20} />
                </div>
            </button>
        </LikeHandler>
    );
}
