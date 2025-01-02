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
} from 'lucide-react';
import { LikeHandler } from './like-button';

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

export default function GiftCard({ quote, icon, border, scheme }) {
    const Icon = icons[icon];

    return (
        <div
            className='fade-slide-up w-full max-w-sm aspect-[3/4] bg-white rounded-lg p-6 shadow-xl transition-all duration-300 ease-in-out'
            style={{ backgroundImage: border }}
        >
            <div
                className={cn(
                    'w-full h-[calc(100%_-_1.5rem)] md:h-[calc(100%_-_3rem)] xl:h-full rounded-sm overflow-hidden bg-white text-gray-800 shadow-xl',
                )}
            >
                <div
                    className={cn(
                        'flex h-full flex-col items-center gap-8 justify-center p-10',
                        scheme,
                    )}
                >
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
