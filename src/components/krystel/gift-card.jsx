'use client';
import { useEffect, useState } from 'react';
import { Asterisk, icons } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { isElevenEleven, isThreeInTheMorning } from '@/helpers/dates';
import usePostAction from '@/hooks/use-post-action';

import RichText from './rich-text';
import { useGreetings } from '@/services/greetings';

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

export default function GiftCard({
    quote,
    icon,
    border = '',
    scheme = 'bg-white text-gray-600',
    settings,
}) {
    const [id] = settings.split(':');
    const firstAppearance = useFirstAppearance(id);
    const LucideIcon = icons[icon];

    const postView = usePostAction({ action: 'view', settings });

    if (isElevenEleven()) {
        quote = '[[[pray]]]$$11:11$$ pide un deseo.';
    }

    if (isThreeInTheMorning()) {
        quote = '[[[[ufo]]]]';
    }

    const isLongText = quote.length > 120;

    const greetings = useGreetings();

    useEffect(() => {
        postView();
    }, []);

    return (
        <div
            className='fade-slide-up w-full max-w-sm aspect-[3/4] bg-gray-200 rounded-lg p-6 shadow-xl transition-all duration-300 ease-in-out'
            style={{ background: border }}
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

                    <div className='block'>
                        <LucideIcon size={56} className='text-current' />
                    </div>

                    <div
                        className={cn(
                            'font-delius text-center text-xl font-medium leading-relaxed',
                            { 'text-md': isLongText },
                        )}
                    >
                        <center>
                            <RichText>{quote}</RichText>
                        </center>
                    </div>

                    <p
                        className={cn(
                            'font-pacifico text-xl text-center opacity-1 transition-all duration-300',
                            {
                                'opacity-0 blur-sm': greetings === '...',
                            },
                        )}
                    >
                        {greetings}
                    </p>
                </div>
            </div>
        </div>
    );
}
