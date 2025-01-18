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
    ['Bonita tú.', 0.6],
    ['Te quiero.', 0.3],
    ['Con todo mi cariño', 0.8],
    ['Te amo demasiado.', 0.01],
    ['Especialmente para tí', 0.6],
    ['Para mi persona favorita.', 0.7],
    ['Nunca pares de brillar.', 0.5],
    ['Sólo para ti.', 0.7],
    ['Siempre en mi mente.', 0.6],
    ['Sólo tú.', 0.3],
    ['Skibidi.', 0.7],
    ['Linda tarde.', 0.95],
    ['Bonito día.', 0.95],
    ['Disfrútalo.', 0.95],
    ['Mis mejores deseos.', 0.95],
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
