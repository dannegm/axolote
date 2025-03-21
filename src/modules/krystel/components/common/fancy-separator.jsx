import { icons } from 'lucide-react';
import { pascalCase } from '@/modules/core/helpers/strings';
import { cn } from '@/modules/core/helpers/utils';

const defaultIcon = 'feather';

export default function FancySeparator({ className, icon = defaultIcon }) {
    const LucideIcon = icons[pascalCase(icon)] || icons[pascalCase(defaultIcon)];
    return (
        <div
            className={cn(
                'flex flex-row gap-4 my-4 items-center text-black opacity-10 mix-blend-luminosity',
                'group-[.frame]:opacity-15 group-[.frame]:text-white group-[.frame.dark]:text-black',
                className,
            )}
        >
            <div className='flex-1 w-full h-0.5 bg-black group-[.frame]:bg-white group-[.frame.dark]:bg-black' />
            <LucideIcon className='flex-none' />
            <div className='flex-1 w-full h-0.5 bg-black group-[.frame]:bg-white group-[.frame.dark]:bg-black' />
        </div>
    );
}
