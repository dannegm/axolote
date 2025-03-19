import * as React from 'react';
import { cn } from '@/modules/core/helpers/utils';

const Input = ({ ref, className, type, ...props }) => {
    return (
        <input
            type={type}
            className={cn(
                'flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-base shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
                {
                    'p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground':
                        type === 'file',
                },
                className,
            )}
            ref={ref}
            {...props}
        />
    );
};
Input.displayName = 'Input';

export { Input };
