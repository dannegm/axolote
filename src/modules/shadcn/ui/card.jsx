import * as React from 'react';

import { cn } from '@/modules/shadcn/lib/utils';

const Card = ({ ref, className, ...props }) => (
    <div
        ref={ref}
        className={cn(
            'rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-2xs dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
            className,
        )}
        {...props}
    />
);
Card.displayName = 'Card';

const CardHeader = ({ ref, className, ...props }) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

const CardTitle = ({ ref, className, ...props }) => (
    <div
        ref={ref}
        className={cn('font-semibold leading-none tracking-tight', className)}
        {...props}
    />
);
CardTitle.displayName = 'CardTitle';

const CardDescription = ({ ref, className, ...props }) => (
    <div
        ref={ref}
        className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
        {...props}
    />
);
CardDescription.displayName = 'CardDescription';

const CardContent = ({ ref, className, ...props }) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = ({ ref, className, ...props }) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
