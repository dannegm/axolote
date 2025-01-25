'use client';
import { useEffect, useState } from 'react';

import { cn } from '@/modules/core/helpers/utils';

const defaultStyles = [
    `italic text-blue-600 font-light font-roboto uppercase`,
    `italic text-red-700 font-medium font-noto`,
    `underline text-green-600 font-semibold font-playwrite`,
    `font-bold text-pink-700 font-oswald`,
    `skew-x-12 text-purple-600 font-extrabold font-playfair`,
    `font-semibold text-teal-600 font-lora`,
    `italic underline text-orange-600 font-normal font-quicksand lowercase`,
    `font-extrabold text-indigo-700 font-bebasNeue`,
    `text-base text-lime-600 font-medium font-macondo`,
    `italic line-through text-gray-700 font-medium font-dosis`,
    `font-bold text-red-700 font-dancingScript`,
    `transform skew-x-[-12deg] text-blue-600 font-normal font-anton`,
    `italic text-indigo-600 font-semibold font-jersey10`,
    `underline text-yellow-700 font-light font-roboto uppercase`,
    `text-base text-teal-600 font-semibold font-noto`,
    `italic font-medium text-pink-600 font-playwrite`,
    `font-extrabold text-green-700 font-oswald`,
    `line-through text-gray-700 font-bold font-playfair`,
    `italic text-blue-700 font-medium font-noto`,
    `italic text-red-700 font-semibold font-roboto`,
    `underline text-green-700 font-bold font-bebasNeue`,
    `line-through text-yellow-600 font-extrabold font-playfair`,
    `font-bold text-pink-700 font-dosis`,
    `skew-x-12 text-purple-700 font-semibold font-lora`,
    `font-normal text-teal-700 font-macondo`,
    `italic underline text-orange-600 font-medium font-quicksand`,
    `font-extrabold text-indigo-700 font-bebasNeue`,
    `text-base text-lime-600 font-light font-macondo`,
    `italic line-through text-gray-600 font-normal font-dancingScript`,
    `transform skew-x-[-12deg] text-blue-700 font-medium font-playwrite`,
    `italic text-indigo-600 font-semibold font-jersey10`,
    `underline text-yellow-700 font-light font-playfair`,
    `text-base text-teal-700 font-normal font-lora`,
    `italic font-medium text-pink-600 font-bebasNeue`,
    `transform skew-x-[-6deg] text-purple-600 font-normal font-macondo`,
    `font-extrabold text-green-700 font-dosis`,
    `line-through text-gray-700 font-bold font-bebasNeue`,
    `font-medium text-orange-600 font-playfair uppercase`,
    `font-bold text-blue-600 font-quicksand`,
    `italic text-green-700 font-semibold font-oswald`,
    `text-lg text-purple-600 font-light font-dosis`,
    `italic text-pink-700 font-bold font-bebasNeue`,
    `underline text-yellow-700 font-light font-lora`,
    `transform skew-x-[12deg] text-indigo-600 font-medium font-playwrite`,
    `line-through text-teal-700 font-normal font-noto`,
    `italic text-blue-700 font-extrabold font-jersey10`,
    `font-normal text-green-600 font-dancingScript`,
    `skew-x-6 text-red-700 font-semibold font-oswald`,
    `italic text-purple-700 font-light font-lora`,
    `text-xl text-gray-700 font-bold font-quicksand`,
    `underline text-teal-700 font-medium font-macondo`,
    `line-through text-pink-700 font-normal font-roboto`,
    `italic text-yellow-600 font-extrabold font-playfair`,
    `font-semibold text-indigo-600 font-dosis`,
    `text-sm text-green-700 font-light font-bebasNeue`,
    `italic text-gray-700 font-bold font-oswald`,
    `font-medium text-orange-600 font-jersey10 uppercase`,
    `skew-x-[-6deg] text-lime-600 font-thin font-playfair`,
    `line-through text-blue-700 font-medium font-lora`,
    `italic text-teal-700 font-bold font-quicksand`,
    `font-light text-yellow-600 font-playwrite`,
];

export default function RandomWord({ className, words, styles = defaultStyles, interval = 120 }) {
    const [currentWord, setCurrentWord] = useState('');
    const [currentStyle, setCurrentStyle] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            const randomStyle = styles[Math.floor(Math.random() * styles.length)];

            setCurrentWord(randomWord);
            setCurrentStyle(randomStyle);
        }, interval);

        return () => clearInterval(timer);
    }, [words, styles, interval]);

    return (
        <span className={cn('h-4 inline-flex items-center', currentStyle, className)}>
            {currentWord}
        </span>
    );
}
