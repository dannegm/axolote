import { confetti } from '@tsparticles/confetti';

const positions = {
    topLeft: { x: 0, y: 0 },
    topCenter: { x: 50, y: 0 },
    topRight: { x: 100, y: 0 },
    middleLeft: { x: 0, y: 50 },
    middleCenter: { x: 50, y: 50 },
    middleRight: { x: 100, y: 50 },
    bottomLeft: { x: 0, y: 100 },
    bottomCenter: { x: 50, y: 100 },
    bottomRight: { x: 100, y: 100 },
};

export const heartsExplosion = ({ position = 'middleCenter' } = {}) => {
    const defaults = {
        angle: 90,
        position: positions[position],
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
        scalar: 3,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 25,
        scalar: 5,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 10,
        scalar: 8,
    });
};

export const starsExplosion = ({ position = 'middleCenter' } = {}) => {
    const defaults = {
        angle: 90,
        position: positions[position],
        spread: 360,
        startVelocity: 30,
        decay: 0.94,
        gravity: 1,
        drift: 0,
        ticks: 100,
        colors: [
            '#EC4899', // Pink 500 (Tailwind)
            '#F472B6', // Pink 400 (Tailwind)
            '#D946EF', // Purple 500 (Tailwind)
            '#9F7AEA', // Purple 400 (Tailwind)
            '#14B8A6', // Teal 500 (Tailwind)
            '#2DD4BF', // Teal 400 (Tailwind)
            '#3B82F6', // Blue 500 (Tailwind)
            '#60A5FA', // Blue 400 (Tailwind)
            '#93C5FD', // Blue 300 (Tailwind)
        ],
        shapes: ['star'],
        zIndex: 2000,
        disableForReducedMotion: true,
    };

    confetti('tsparticles', {
        ...defaults,
        count: 50,
        scalar: 1,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 25,
        scalar: 2,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 10,
        scalar: 3,
    });
};

export const snowExplosion = ({ position = 'middleCenter' } = {}) => {
    const magnifier = 3;
    const defaults = {
        angle: 90,
        position: positions[position],
        spread: 360,
        startVelocity: 30,
        decay: 0.94,
        gravity: 1,
        drift: 0,
        ticks: 100,
        shapes: ['emoji'],
        shapeOptions: {
            emoji: {
                value: ['❄️', '⛄', '✨', '🤍'],
            },
        },
        zIndex: 2000,
        disableForReducedMotion: true,
    };

    confetti('tsparticles', {
        ...defaults,
        count: 50,
        scalar: 1 * magnifier,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 25,
        scalar: 2 * magnifier,
    });

    confetti('tsparticles', {
        ...defaults,
        count: 10,
        scalar: 3 * magnifier,
    });
};
