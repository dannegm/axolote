'use client';

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
        // Desactivando hasta encontrar una mejor recompensa.
        id: '_balloons',
        description: '¿Viste el secreto después de haber reventado todos los globos?',
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
        id: 'admin',
        description: 'Ahora te sientes observada, ¿no?',
    },
];

export default function useEasterEggs() {
    const discover = id => {
        localStorage.setItem(`eeggs:${id}`, true);
    };

    const getSecrets = () => {
        return easterEggs.map(item => ({
            ...item,
            discovered: localStorage.getItem(`eeggs:${item.id}`) ?? false,
        }));
    };

    return {
        discover,
        getSecrets,
    };
}
