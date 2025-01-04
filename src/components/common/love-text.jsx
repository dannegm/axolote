'use client';
import useSound from 'use-sound';
import { heartsExplosion } from '@/helpers/particles';

export default function LoveText({ children }) {
    const [playPop] = useSound('./sounds/pop.mp3');

    const handleButtonClick = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        heartsExplosion();
        playPop();
    };

    return (
        <span className='font-extrabold text-red-500 italic' onClick={handleButtonClick}>
            {children}
        </span>
    );
}
