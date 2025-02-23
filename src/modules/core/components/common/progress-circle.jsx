'use client';
import { cn } from '@/modules/core/helpers/utils';

export default function ProgressCircle({
    className,
    size = 24,
    value = 0,
    total = 100,
    weight = 2,
    trackColor = 'transparent',
}) {
    const radius = (24 - weight) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(Math.max(value / total, 0), 1) * circumference;

    return (
        <svg width={size} height={size} viewBox='0 0 24 24' className={cn('transform', className)}>
            <circle
                cx={12}
                cy={12}
                r={radius}
                fill='none'
                stroke={trackColor}
                strokeWidth={weight}
            />
            <circle
                cx={12}
                cy={12}
                r={radius}
                fill='none'
                stroke='currentColor'
                strokeWidth={weight}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap='round'
                className='transition-all duration-300 ease-in-out'
            />
        </svg>
    );
}
