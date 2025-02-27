'use client';
import ClientOnly from '@/modules/core/components/common/client-only';
import { cn } from '@/modules/core/helpers/utils';

export default function Frame({ className, children }) {
    return (
        <ClientOnly>
            <div
                data-layer='app-frame'
                className={cn('max-h-[300px] overflow-hidden', className)}
            >
                {children}
            </div>
        </ClientOnly>
    );
}
