'use client';
import { useEffect } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { Check } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useReasonsLove from '@/modules/krystel/hooks/use-reasons-love';
import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';

import Frame from './frame';
import Button from '../common/button';
import FancySeparator from '../common/fancy-separator';
import { reverse } from '@/modules/core/helpers/arrays';

export default function AllReasonsLove() {
    const [allowClear] = useQueryState('allow-clear', parseAsBoolean.withDefault(false));
    const [revealed] = useQueryState('revealed', parseAsBoolean.withDefault(false));
    const { discover: discoverSecret } = useEasterEggs();

    const { reasons, clearReasons, getStats } = useReasonsLove();
    const { discovered, total, allDiscovered } = getStats();

    const discoveredReasons = reverse(
        reasons.filter(i => i.discovered).map((i, ix) => ({ ...i, index: ix + 1 })),
    );
    const hiddenReasons = reasons.filter(i => !i.discovered);

    const [, setStarted] = useLocalStorage('reasons:started', false);
    const [, setFinished] = useLocalStorage('reasons:finished', false);
    const [, setCurrentReason] = useLocalStorage('reasons:current', 0);

    const handleReset = () => {
        setStarted(false);
        setFinished(false);
        setCurrentReason(0);
        clearReasons();
    };

    useEffect(() => {
        if (revealed) {
            discoverSecret('reasons_hacked');
        }
    }, [revealed]);

    useEffect(() => {
        if (allDiscovered) {
            discoverSecret('reasons_all');
        }
    }, [allDiscovered]);

    return (
        <Frame className='max-h-auto flex flex-col gap-4'>
            <p className='font-delius text-pretty text-sm'>
                <span className='font-mono font-bold text-rose-500'>#100Reasons</span> por las que
                te amo tanto.
                <br />
                <span className='inline-block mt-2 px-3 py-1 bg-white/70 text-xs font-noto rounded-full'>
                    Descubriste <b>{discovered}</b> de <b>{total}</b>
                </span>
            </p>

            {Boolean(discoveredReasons.length) && (
                <ul className='flex flex-col gap-2 mt-4'>
                    {discoveredReasons.map((item, index) => (
                        <li key={`reason:${item.id}`} className='flex flex-row gap-2'>
                            <div
                                className={cn(
                                    'block flex-none w-4 h-4 bg-indigo-100 box-border border border-indigo-300 rounded-sm text-green-500',
                                )}
                            >
                                <Check className='-mt-[6px] -ml-[1px]' strokeWidth={3} />
                            </div>
                            <span className={cn('font-delius text-balance leading-4')}>
                                <span className='mr-1 font-mono font-bold text-rose-500'>
                                    #{item.index}
                                </span>
                                {item.description}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {Boolean(hiddenReasons.length) && (
                <>
                    <FancySeparator icon='lock' />
                    <ul className='flex flex-col gap-2'>
                        {hiddenReasons.map((item, index, arr) => (
                            <li key={`reason:${item.id}`} className='flex flex-row gap-2'>
                                <div
                                    className={cn(
                                        'block flex-none w-4 h-4 bg-indigo-100 box-border border border-indigo-300 rounded-sm text-green-500 transition-all duration-150',
                                        {
                                            'bg-slate-100 border border-slate-300':
                                                !item.discovered,
                                        },
                                    )}
                                >
                                    {item.discovered && (
                                        <Check className='-mt-[6px] -ml-[1px]' strokeWidth={3} />
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        'font-delius text-balance leading-4 transition-all duration-150',
                                        {
                                            'blur-xs select-none': !item.discovered,
                                            'blur-none select-all': revealed,
                                        },
                                    )}
                                >
                                    <span className='mr-1 font-mono font-bold text-rose-500'>
                                        #{arr.length - index}
                                    </span>
                                    {item.description}
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {(allowClear || allDiscovered) && (
                <Button className={cn('block w-fit text-sm px-4 py-2 mt-4')} onClick={handleReset}>
                    Comenzar de nuevo ✨
                </Button>
            )}
        </Frame>
    );
}
