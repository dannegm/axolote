import { useEffect, useState } from 'react';
import { randomPick } from '@/modules/core/helpers/arrays';
import {
    isBdaySeason,
    isElevenEleven,
    isThreeInTheMorning,
    isTimeInMorningRange,
    isTimeInNightRange,
} from '@/modules/krystel/helpers/dates';

const greetings = [
    ['Sonríe.', 0.95],
    ['Te quiero.', 0.1],
    ['Disfrútalo.', 0.95],
    ['Feliz cumple.', 0.5],
    ['Snow time.', 0.75],
];

export const getGreetings = () => {
    if (isBdaySeason()) {
        return 'Feliz cumple.';
    }

    if (isTimeInMorningRange()) {
        return 'Bonito día.';
    }

    if (isTimeInNightRange()) {
        return 'Bonita noche.';
    }

    if (isElevenEleven()) {
        return 'Hora mágica.';
    }

    if (isThreeInTheMorning()) {
        return 'Ufo time.';
    }

    const rng = Math.random();
    const filtered = greetings.filter(([, prob]) => prob > rng);
    return randomPick(filtered.map(([greet]) => greet)) || 'Bonito día';
};

export const useGreetings = () => {
    const [greetings, setGreetings] = useState('...');

    useEffect(() => {
        const greet = getGreetings();
        setGreetings(greet);
    }, []);

    return greetings;
};
