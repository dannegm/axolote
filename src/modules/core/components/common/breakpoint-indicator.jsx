'use client';

import useSettings from '@/modules/core/hooks/use-settings';
import { cn } from '@/modules/shadcn/lib/utils';
import ClientOnly from './client-only';
import { useState } from 'react';
import useResize from '../../hooks/use-resize';

export default function BreakpointIndicator({ position = 'bottom-right' }) {
    const [size, setSize] = useState('');
    const [showIndicator] = useSettings('settings:show_breakpoint_indicator', false);

    const positions = {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
        'middle-left': 'left-4 top-1/2 transform -translate-y-1/2',
        'middle-right': 'right-4 top-1/2 transform -translate-y-1/2',
    };

    const positionClassName = positions[position] || positions['bottom-right'];

    useResize(() => {
        setSize(window.innerWidth);
    });

    return (
        <ClientOnly>
            {showIndicator && (
                <div
                    className={cn(
                        'fixed z-[500] flex gap-1 bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold',
                        positionClassName,
                    )}
                >
                    <span className='block sm:hidden'>XS</span>
                    <span className='hidden sm:block md:hidden'>SM</span>
                    <span className='hidden md:block lg:hidden'>MD</span>
                    <span className='hidden lg:block xl:hidden'>LG</span>
                    <span className='hidden xl:block 2xl:hidden'>XL</span>
                    <span className='hidden 2xl:block'>2XL</span>
                    <span className='block'>{`•`}</span>
                    <span className='block'>{`${size}px`}</span>
                </div>
            )}
        </ClientOnly>
    );
}
