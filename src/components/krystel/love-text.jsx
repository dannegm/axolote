'use client';
import useSound from 'use-sound';
import { heartsExplosion } from '@/helpers/particles';
import { useQuote } from '@/providers/quote-provider';
import usePostAction from '@/hooks/use-post-action';

export default function LoveText({ children }) {
    const [playPop] = useSound('./sounds/pop.mp3');

    const quote = useQuote();
    const postLove = usePostAction({ action: 'love', settings: quote.settings });

    const handleButtonClick = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        heartsExplosion();
        playPop();
        postLove();
    };

    return (
        <span className='font-extrabold text-red-500 italic' onClick={handleButtonClick}>
            {children}
        </span>
    );
}
