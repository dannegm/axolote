'use client';
import { cn } from '@/helpers/utils';

export default function Polaroid({ url, description }) {
    console.log({ url, description });
    const rotations = ['rotate-[-6deg]', 'rotate-[6deg]', 'rotate-[-3deg]', 'rotate-[3deg]'];

    return (
        <div className='-mt-20'>
            <figure
                className={cn(
                    'flex flex-col gap-2 bg-white p-2 mt-4 mb-4 -rotate-6 scale-150 shadow-md transition-all',
                    'md:scale-[1.7]',
                    rotations[Math.floor(Math.random() * rotations.length)],
                )}
            >
                <img className={cn('object-cover w-28 aspect-[3/4]')} src={url} alt='' />
                <figcaption className='w-28 text-center text-[0.5rem]'>{description}</figcaption>
            </figure>
        </div>
    );
}
