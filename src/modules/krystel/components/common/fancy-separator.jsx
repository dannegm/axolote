import { cn } from '@/modules/core/helpers/utils';
import { icons } from 'lucide-react';

const defaultIcon = 'Feather';

export default function FancySeparator({ className, icon = defaultIcon }) {
    const LucideIcon = icons[icon] || icons[defaultIcon];
    return (
        <div
            className={cn(
                'flex flex-row gap-4 my-4 items-center text-black/10 mix-blend-luminosity',
                className,
            )}
        >
            <div className='flex-1 w-full h-0.5 bg-black/10 mix-blend-luminosity' />
            <LucideIcon className='flex-none' />
            <div className='flex-1 w-full h-0.5 bg-black/10 mix-blend-luminosity' />
        </div>
    );
}
