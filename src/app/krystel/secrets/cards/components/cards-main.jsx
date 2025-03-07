'use client';
import Link from 'next/link';
import { BadgePlus } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';

import ClientOnly from '@/modules/core/components/common/client-only';
import CardsList from './cards-list';

export default function CardsMain({ data = [] }) {
    const [showBreakpointIndicator] = useSettings('settings:show_breakpoint_indicator', false);
    return (
        <ClientOnly>
            <div className='grid grid-flow-row pb-16'>
                <div
                    className={cn(
                        'fixed z-50 bottom-4 right-4 transition-all duration-150 animate-in slide-in-from-right ',
                        {
                            'bottom-16': showBreakpointIndicator,
                        },
                    )}
                >
                    <Link
                        className='flex-center size-16 sm:size-12 bg-black text-white rounded-full shadow-lg transition-all duration-150 ease-in-out hover:scale-105 active:scale-95'
                        href='/krystel/secrets/editor'
                    >
                        <BadgePlus />
                    </Link>
                </div>

                <div className='mt-4' />

                <CardsList data={data} />
            </div>
        </ClientOnly>
    );
}
