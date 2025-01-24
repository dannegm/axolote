import { tv } from 'tailwind-variants';
import { cn } from '@/helpers/utils';

export const badgeVariants = tv({
    base: cn(
        'inline-flex items-center gap-x-1 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
    ),
    variants: {
        variant: {
            default: [
                'bg-blue-50 text-blue-900 ring-blue-500/30',
                'dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30',
            ],
            neutral: [
                'bg-gray-50 text-gray-900 ring-gray-500/30',
                'dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20',
            ],
            success: [
                'bg-emerald-50 text-emerald-900 ring-emerald-600/30',
                'dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20',
            ],
            error: [
                'bg-red-50 text-red-900 ring-red-600/20',
                'dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20',
            ],
            warning: [
                'bg-yellow-50 text-yellow-900 ring-yellow-600/30',
                'dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20',
            ],

            // For Event Types
            like: [
                'uppercase font-bold',
                'bg-red-50 text-red-900 ring-red-600/30',
                'dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20',
            ],
            love: [
                'uppercase font-bold',
                'bg-red-50 text-red-900 ring-red-600/30',
                'dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20',
            ],
            save: [
                'uppercase font-bold',
                'bg-green-50 text-green-900 ring-green-600/30',
                'dark:bg-green-400/10 dark:text-green-500 dark:ring-green-400/20',
            ],
            share: [
                'uppercase font-bold',
                'bg-cyan-50 text-cyan-900 ring-cyan-600/30',
                'dark:bg-cyan-400/10 dark:text-cyan-500 dark:ring-cyan-400/20',
            ],
            shine: [
                'uppercase font-bold',
                'bg-teal-50 text-teal-900 ring-teal-600/30',
                'dark:bg-teal-400/10 dark:text-teal-500 dark:ring-teal-400/20',
            ],
            reveal: [
                'uppercase font-bold',
                'bg-pink-50 text-pink-900 ring-pink-600/30',
                'dark:bg-pink-400/10 dark:text-pink-500 dark:ring-pink-400/20',
            ],
            play: [
                'uppercase font-bold',
                'bg-blue-50 text-blue-900 ring-blue-600/30',
                'dark:bg-blue-400/10 dark:text-blue-500 dark:ring-blue-400/20',
            ],
            view: [
                'uppercase font-bold',
                'bg-yellow-50 text-yellow-900 ring-yellow-600/30',
                'dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20',
            ],
            snow: [
                'uppercase font-bold',
                'bg-sky-50 text-sky-900 ring-sky-600/30',
                'dark:bg-sky-400/10 dark:text-sky-500 dark:ring-sky-400/20',
            ],
            new: [
                'uppercase font-bold',
                'bg-purple-50 text-purple-900 ring-purple-600/30',
                'dark:bg-purple-400/10 dark:text-purple-500 dark:ring-purple-400/20',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export default function Badge({ className, variant, ...props }, ref) {
    return (
        <span
            ref={ref}
            className={cn(badgeVariants({ variant }), className)}
            tremor-id='tremor-raw'
            {...props}
        />
    );
}
