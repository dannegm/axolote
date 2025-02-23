'use client';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { Check } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';

import Frame from './frame';
import { useEffect } from 'react';

export default function EasterEggs() {
    const [revealed] = useQueryState('revealed', parseAsBoolean.withDefault(false));
    const { discover, secrets } = useEasterEggs();

    const found = secrets.filter(i => i.discovered).length;
    const total = secrets.length;

    useEffect(() => {
        discover('easter_card');
    }, []);

    return (
        <Frame className='max-h-auto flex flex-col gap-4'>
            <p className='font-delius text-pretty text-sm'>
                Esta es una lista de todos los easter eggs que has encontrado (<b>{found}</b> de{' '}
                <b>{total}</b>):
            </p>

            <ul className='flex flex-col gap-1'>
                {secrets.map(item => (
                    <li key={`egg:${item.id}`} className='flex flex-row gap-2'>
                        <div
                            className={cn(
                                'block flex-none w-4 h-4 bg-indigo-100 box-border border border-indigo-300 rounded-md text-green-500 transition-all duration-150',
                                {
                                    'bg-slate-100 border border-slate-300': !item.discovered,
                                },
                            )}
                        >
                            {item.discovered && (
                                <Check className='-mt-[6px] -ml-[1px]' strokeWidth={3} />
                            )}
                        </div>
                        <span
                            className={cn(
                                'font-delius text-pretty -mt-0.5 transition-all duration-150',
                                {
                                    'line-through': item.discovered,
                                    'blur-sm select-none': !item.discovered,
                                    'blur-none select-all': revealed,
                                },
                            )}
                        >
                            {item.description}
                        </span>
                    </li>
                ))}
            </ul>
        </Frame>
    );
}
