'use client';

import { createContext, useContext, useState } from 'react';
import useSound from 'use-sound';

import { cn } from '@/helpers/utils';

const SpoilerContext = createContext();

const SpoilerWord = ({ children }) => {
    const { hidden, toggleSpoiler } = useContext(SpoilerContext);
    return (
        <span
            className={cn(
                'cursor-pointer rounded-md px-1 box-decoration-clone bg-purple-400 text-white transition-all duration-500',
                { 'blur-sm': hidden },
            )}
            onClick={toggleSpoiler}
        >
            {children}
        </span>
    );
};

export default function SpoilerText({ children }) {
    const [playHush] = useSound('./sounds/shush.mp3');
    const [hidden, setHidden] = useState(true);

    const toggleSpoiler = ev => {
        setHidden(!hidden);
        playHush();
    };

    const words = children
        .trim()
        .split(' ')
        .map((word, index) => ({ key: `${word}_${index}`, word }));

    return (
        <SpoilerContext.Provider value={{ hidden, toggleSpoiler }}>
            <span className='inline-flex flex-row justify-center flex-wrap gap-1'>
                {words.map(item => (
                    <SpoilerWord key={item.key}>{item.word}</SpoilerWord>
                ))}
            </span>
        </SpoilerContext.Provider>
    );
}
