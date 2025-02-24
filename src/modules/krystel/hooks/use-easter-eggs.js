'use client';
import { useState, useEffect } from 'react';

const easterEggs = [
    {
        id: 'easter_card',
        description: 'Esta carta en sí misma ya es un secreto',
    },
    {
        id: 'eleven_eleven',
        description: 'Pide un deseo a las 11:11',
    },
    {
        id: 'ufo_time',
        description: 'Algo misterioso se asoma a las 3am',
    },
    {
        id: 'uwu_mode',
        description: '¿Qué kawaii el modo UwU, no?',
    },
    {
        id: 'secret_card',
        description: 'Encontraste la carta más secreta de todas',
    },
    {
        id: 'hidden_card',
        description: 'Ahora ya sabes cómo ver cartitas ocultas',
    },
    {
        id: 'balloons',
        description: '¿Te divertiste reventado los globos?',
    },
    {
        id: 'valentin',
        description: 'Sabía que sí querías ser mi san valentín',
    },
    {
        id: 'nyancat',
        description: 'Nya nya nya nya',
    },
    {
        id: 'locos',
        description: 'Pero esta noche estas loca como yo..',
    },
    {
        id: 'tldr',
        description: 'No pensé que fueras a leerlo todo',
    },
    {
        id: 'matrix',
        description: 'Conociste las entrañas de la matrix',
    },
    {
        id: 'wyr',
        description: 'La vida está llena de decisiones difíciles',
    },
    {
        id: 'eggs_hacked',
        description: 'Oye!. Eso es hacer trampa...',
    },
];

export default function useEasterEggs() {
    const [secrets, setSecrets] = useState([]);

    const channel = new BroadcastChannel('eeggs:channel');

    const loadSecrets = () => {
        setSecrets(
            easterEggs.map(item => ({
                ...item,
                discovered: localStorage.getItem(`eeggs:${item.id}`) === 'true',
            })),
        );
    };

    const discover = id => {
        const key = `eeggs:${id}`;
        if (localStorage.getItem(key) === 'true') return;

        localStorage.setItem(key, 'true');
        loadSecrets();
        channel.postMessage({ type: 'update' });
    };

    useEffect(() => {
        loadSecrets();

        const handleMessage = event => {
            if (event.data.type === 'update') {
                loadSecrets();
            }
        };

        channel.addEventListener('message', handleMessage);
        return () => channel.removeEventListener('message', handleMessage);
    }, []);

    return { secrets, discover };
}
