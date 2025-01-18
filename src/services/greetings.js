import { useEffect, useState } from 'react';
import { randomPick } from '@/helpers/arrays';
import {
    isBdaySeason,
    isElevenEleven,
    isThreeInTheMorning,
    isTimeInMorningRange,
    isTimeInNightRange,
} from '@/helpers/dates';

const greetings = [
    ['Sonríe.', 0.95],
    ['Bonita tú.', 0.3],
    ['Te quiero.', 0.1],
    ['Con todo mi cariño.', 0.8],
    ['Te amo demasiado.', 0.001],
    ['Especialmente para tí', 0.6],
    ['Para mi persona favorita.', 0.7],
    ['Para ti.', 0.7],
    ['Disfrútalo.', 0.95],
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
