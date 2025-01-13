// Tremor Table [v0.0.3]

import { cn } from '@/helpers/utils';

export function TableRoot({ className, children, ref, ...props }) {
    return (
        <div ref={ref}>
            <div className={cn('w-full overflow-auto whitespace-nowrap', className)} {...props}>
                {children}
            </div>
        </div>
    );
}

export function Table({ className, ref, ...props }) {
    return (
        <table
            ref={ref}
            tremor-id='tremor-raw'
            className={cn('w-full caption-bottom border-b', className)}
            {...props}
        />
    );
}

export function TableHead({ className, ref, ...props }) {
    return <thead ref={ref} className={cn(className)} {...props} />;
}

export function TableHeaderCell({ className, ref, ...props }) {
    return (
        <th
            ref={ref}
            className={cn(
                'border-b px-4 py-3.5 text-left text-sm font-semibold',
                'border-gray-200',
                className,
            )}
            {...props}
        />
    );
}

export function TableBody({ className, ref, ...props }) {
    return <tbody ref={ref} className={cn('divide-y', 'divide-gray-200', className)} {...props} />;
}

export function TableRow({ className, ref, ...props }) {
    return (
        <tr
            ref={ref}
            className={cn(
                '[&_td:last-child]:pr-4 [&_th:last-child]:pr-4',
                '[&_td:first-child]:pl-4 [&_th:first-child]:pl-4',
                className,
            )}
            {...props}
        />
    );
}

export function TableCell({ className, ref, ...props }) {
    return <td ref={ref} className={cn('p-4 text-sm', 'text-gray-600', className)} {...props} />;
}

export function TableFoot({ className, ref, ...props }) {
    return (
        <tfoot
            ref={ref}
            className={cn(
                'border-t text-left font-medium',
                'text-gray-900',
                'border-gray-200',
                className,
            )}
            {...props}
        />
    );
}

export function TableCaption({ className, ref, ...props }) {
    return (
        <caption
            ref={ref}
            className={cn('mt-3 px-3 text-center text-sm', 'text-gray-500', className)}
            {...props}
        />
    );
}
