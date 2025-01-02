'use client';
import useSound from 'use-sound';

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

export default function LoveText({ children }) {
    const [playPop] = useSound('./sounds/pop.mp3');

    const handleButtonClick = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        heartExplosion();
        playPop();
    };

    return (
        <span className='font-bold text-red-500 italic' onClick={handleButtonClick}>
            {children}
        </span>
    );
}
