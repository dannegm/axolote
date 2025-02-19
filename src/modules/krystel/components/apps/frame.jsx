'use client';
import ClientOnly from '@/modules/core/components/common/client-only';
import { cn } from '@/modules/core/helpers/utils';

export default function Frame({ className, children }) {
    return (
        <ClientOnly>
            <div className={cn('max-w-[300px] max-h-[300px] overflow-hidden', className)}>
                {children}
            </div>
        </ClientOnly>
    );
}
