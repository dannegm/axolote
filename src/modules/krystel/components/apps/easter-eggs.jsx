import { useEffect } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { Check } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';

import Frame from './frame';
import Button from '../common/button';

export default function EasterEggs() {
    const [allowClear] = useQueryState('allow-clear', parseAsBoolean.withDefault(false));
    const [revealed] = useQueryState('revealed', parseAsBoolean.withDefault(false));
    const { secrets, discover, clearSecrets } = useEasterEggs();

    const found = secrets.filter(i => i.discovered).length;
    const total = secrets.length;

    useEffect(() => {
        discover('easter_card');
    }, []);

    useEffect(() => {
        if (revealed) {
            discover('eggs_hacked');
        }
    }, [revealed]);

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
                                'block flex-none w-4 h-4 bg-indigo-100 box-border border border-indigo-300 rounded-sm text-green-500 transition-all duration-150',
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
                                    'blur-xs select-none': !item.discovered,
                                    'blur-none select-all': revealed,
                                },
                            )}
                        >
                            {item.description}
                        </span>
                    </li>
                ))}
            </ul>

            {allowClear && (
                <Button className={cn('block w-fit text-sm px-4 py-2 mt-4')} onClick={clearSecrets}>
                    Comenzar de nuevo 🕵🏻‍♀️
                </Button>
            )}
        </Frame>
    );
}
