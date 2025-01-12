'use client';

import useSound from 'use-sound';
import { Heart } from 'lucide-react';

import { heartsExplosion } from '@/helpers/particles';
import usePostAction from '@/hooks/use-post-action';

export const LikeHandler = ({ settings, type = 'single', children }) => {
    const [playPop] = useSound('./sounds/pop.mp3');

    const postLike = usePostAction({ action: 'like', settings });

    const handleButtonClick = ev => {
        ev.preventDefault();
        postLike();
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
