'use client';
import ClientOnly from '@/modules/core/components/common/client-only';
import { cn } from '@/modules/core/helpers/utils';

export default function Frame({ className, children }) {
    return (
        <ClientOnly>
            <div data-layer='app-frame' className={cn(className)}>
                {children}
            </div>
        </ClientOnly>
    );
}
