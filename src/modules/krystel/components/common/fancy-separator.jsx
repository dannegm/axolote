import { icons } from 'lucide-react';

const defaultIcon = 'Feather';

export default function FancySeparator({ icon = defaultIcon }) {
    const LucideIcon = icons[icon] || icons[defaultIcon];
    return (
        <div className='flex flex-row gap-4 my-4 items-center text-black/10 mix-blend-luminosity'>
            <div className='flex-1 w-full h-0.5 bg-black/10 mix-blend-luminosity' />
            <LucideIcon className='flex-none' />
            <div className='flex-1 w-full h-0.5 bg-black/10 mix-blend-luminosity' />
        </div>
    );
}
