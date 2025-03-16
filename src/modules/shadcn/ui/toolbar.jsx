import { cn } from '@/modules/core/helpers/utils';

import { Button } from '@/modules/shadcn/ui/button';

export const Toolbar = ({ className, children }) => {
    return (
        <div
            className={cn(
                'w-full',
                'bg-white dark:bg-zinc-900',
                'border border-zinc-200 dark:border-zinc-800',
                'rounded-md',
                'flex items-center gap-1 p-1',
                className,
            )}
        >
            {children}
        </div>
    );
};

export const ToolbarSpacer = ({ className, ...props }) => {
    return <div className={cn('flex-1', className)} {...props} />;
};

export const ToolbarButton = ({ className, children, ...props }) => {
    return (
        <Button className={cn(className)} type='button' variant='toolbarButton' {...props}>
            {children}
        </Button>
    );
};

export const ToolbarAction = ({ className, children, ...props }) => {
    return (
        <Button className={cn(className)} type='button' variant='toolbarAction' {...props}>
            {children}
        </Button>
    );
};
