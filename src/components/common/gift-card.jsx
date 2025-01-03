'use client';
import { cn } from '@/helpers/utils';

import RichText from './rich-text';

import {
    Cake,
    Gift,
    PartyPopper,
    Snowflake,
    Candy,
    Clover,
    Cookie,
    Cat,
    Flower,
    Gem,
    Lollipop,
    MoonStar,
    Origami,
    Sparkles,
    Asterisk,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export const icons = {
    Candy,
    Cake,
    Gift,
    PartyPopper,
    Snowflake,
    Clover,
    Cookie,
    Cat,
    Flower,
    Gem,
    Lollipop,
    MoonStar,
    Origami,
    Sparkles,
};

const useFirstAppearance = id => {
    const [isFirstAppearance, setIsFirstAppearance] = useState(false);

    useEffect(() => {
        const appearedItems = JSON.parse(localStorage.getItem('appearedItems')) || [];

        if (appearedItems.includes(id)) {
            setIsFirstAppearance(false);
        } else {
            appearedItems.push(id);
            localStorage.setItem('appearedItems', JSON.stringify(appearedItems));
            setIsFirstAppearance(true);
        }
    }, [id]);

    return isFirstAppearance;
};

export default function GiftCard({ quote, icon, border, scheme, settings }) {
    const Icon = icons[icon];
    const [id] = settings.split(':');
    const firstAppearance = useFirstAppearance(id);

    return (
        <div
            className='fade-slide-up w-full max-w-sm aspect-[3/4] bg-white rounded-lg p-6 shadow-xl transition-all duration-300 ease-in-out'
            style={{ backgroundImage: border }}
        >
            <div
                className={cn(
                    'w-full h-[calc(100%_-_1.5rem)] md:h-[calc(100%_-_3rem)] xl:h-full rounded overflow-hidden bg-white text-gray-800 shadow-xl',
                )}
            >
                <div
                    className={cn(
                        'relative flex h-full flex-col items-center gap-6 md:gap-8 justify-center p-10',
                        scheme,
                    )}
                >
                    {firstAppearance && (
                        <div className='fade-in absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-pink-600 rounded-full'>
                            <Asterisk size={24} className='text-white' />
                        </div>
                    )}

                    <p className='font-pacifico text-3xl text-center'>Krystel,</p>

                    {Icon && (
                        <div className='block'>
                            <Icon size={64} className='text-current' />
                        </div>
                    )}

                    <div className='font-delius text-center text-xl font-medium leading-relaxed'>
                        <center>
                            <RichText>{quote}</RichText>
                        </center>
                    </div>

                    <p className='font-pacifico text-xl text-center'>Feliz cumple.</p>
                </div>
            </div>
        </div>
    );
}
