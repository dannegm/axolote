'use client';
import useSound from 'use-sound';
import { heartsExplosion } from '@/modules/krystel/helpers/particles';
import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';

export default function LoveText({ children }) {
    const [playPop] = useSound('/sounds/pop.mp3');

    const quote = useQuote();
    const postLove = usePostAction({ action: 'love', settings: quote?.settings });

    const handleButtonClick = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        heartsExplosion();
        playPop();
        postLove();
    };

    return (
        <span className='font-lora font-extrabold text-red-500' onClick={handleButtonClick}>
            {children}
        </span>
    );
}
