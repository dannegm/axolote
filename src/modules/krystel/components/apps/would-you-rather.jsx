import { useState } from 'react';
import { cn } from '@/modules/core/helpers/utils';

import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';
import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';

import Frame from './frame';

export default function WouldYouRather({ a = 'esto', b = 'esto', _a, _b }) {
    const itemClassName =
        'block h-0 p-0 overflow-hidden text-white opacity-0 cursor-pointer interpolate-size transition-all duration-500';

    const [selected, setSelected] = useState('none');

    const comments = {
        A: _a,
        B: _b,
    };

    const { discover } = useEasterEggs();
    const quote = useQuote();

    const postSelectA = usePostAction({
        action: 'wyr_select_a',
        settings: quote.settings,
    });
    const postSelectB = usePostAction({
        action: 'wyr_select_b',
        settings: quote.settings,
    });

    const handleSelectA = () => {
        setSelected('A');
        postSelectA();
        discover('wyr');
    };

    const handleSelectB = () => {
        setSelected('B');
        postSelectB();
        discover('wyr');
    };

    return (
        <Frame className='flex flex-col gap-2'>
            <div className='flex flex-col shadow-2xs'>
                <div
                    className={cn(itemClassName, 'bg-red-500 rounded-t-xl', {
                        'h-auto p-4 border-b-2 border-b-red-600 opacity-100':
                            selected === 'none' || selected === 'A',
                        'rounded-xl': selected !== 'none',
                    })}
                    onClick={handleSelectA}
                >
                    {a}
                </div>
                {selected === 'none' && (
                    <div className='relative left-1/2 -m-3 flex-center w-6 h-6 bg-white rounded-full text-xs ring-1 ring-gray-200'>
                        O
                    </div>
                )}
                <div
                    className={cn(itemClassName, 'bg-blue-500 rounded-b-xl', {
                        'h-auto p-4 border-t-2 border-t-blue-400 opacity-100':
                            selected === 'none' || selected === 'B',
                        'rounded-xl': selected !== 'none',
                    })}
                    onClick={handleSelectB}
                >
                    {b}
                </div>
            </div>

            {comments[selected] && (
                <div
                    className={cn(
                        'h-0 p-0 overflow-hidden opacity-0 text-xs bg-rose-100 rounded-md transition-all duration-1000',
                        {
                            'h-auto p-2 opacity-100': selected !== 'none',
                            'bg-rose-100': selected === 'A',
                            'bg-indigo-100': selected === 'B',
                        },
                    )}
                >
                    {comments[selected]}
                </div>
            )}
        </Frame>
    );
}
