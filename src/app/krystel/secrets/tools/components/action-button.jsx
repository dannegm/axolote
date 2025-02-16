'use client';
import { icons } from 'lucide-react';
import BounceLoader from 'react-spinners/BounceLoader';

import { useMutation } from '@tanstack/react-query';

import { cn } from '@/modules/core/helpers/utils';
import { Ntfy } from '@/modules/core/services/ntfy';

const APP_TOPIC = process.env.NEXT_PUBLIC_EVENTS_TOPIC;

const ntfy = new Ntfy(APP_TOPIC);

const getColorHex = color => {
    const colors = {
        red: '#ef4444',
        blue: '#3b82f6',
        green: '#22c55e',
        yellow: '#eab308',
        purple: '#a855f7',
        pink: '#ec4899',
        indigo: '#6366f1',
        teal: '#14b8a6',
        orange: '#f97316',
        cyan: '#06b6d4',
        lime: '#84cc16',
        amber: '#f59e0b',
        emerald: '#10b981',
        rose: '#f43f5e',
        sky: '#0ea5e9',
        violet: '#8b5cf6',
        fuchsia: '#d946ef',
        stone: '#78716c',
        neutral: '#737373',
        zinc: '#71717a',
        gray: '#6b7280',
        slate: '#64748b',
    };

    return colors[color] || colors.gray;
};

const getGradientColors = color => {
    const colors = {
        red: 'from-red-500 to-red-600 text-white',
        blue: 'from-blue-500 to-blue-600 text-white',
        green: 'from-green-500 to-green-600 text-white',
        yellow: 'from-yellow-500 to-yellow-600 text-white',
        purple: 'from-purple-500 to-purple-600 text-white',
        pink: 'from-pink-500 to-pink-600 text-white',
        indigo: 'from-indigo-500 to-indigo-600 text-white',
        teal: 'from-teal-500 to-teal-600 text-white',
        orange: 'from-orange-500 to-orange-600 text-white',
        cyan: 'from-cyan-500 to-cyan-600 text-white',
        lime: 'from-lime-500 to-lime-600 text-white',
        amber: 'from-amber-500 to-amber-600 text-white',
        emerald: 'from-emerald-500 to-emerald-600 text-white',
        rose: 'from-rose-500 to-rose-600 text-white',
        sky: 'from-sky-500 to-sky-600 text-white',
        violet: 'from-violet-500 to-violet-600 text-white',
        fuchsia: 'from-fuchsia-500 to-fuchsia-600 text-white',
        stone: 'from-stone-500 to-stone-600 text-white',
        neutral: 'from-neutral-500 to-neutral-600 text-white',
        zinc: 'from-zinc-500 to-zinc-600 text-white',
        gray: 'from-gray-500 to-gray-600 text-white',
        slate: 'from-slate-500 to-slate-600 text-white',
    };

    return colors[color] || colors.gray;
};

const useAction = actionName => {
    const { mutate, isLoading } = useMutation({
        mutationFn: command => ntfy.pushSimple({ message: command }),
    });

    const trigger = () => {
        mutate(actionName);
    };

    return [trigger, isLoading];
};

export default function ActionButton({
    label = 'Action',
    icon = 'SquareDashed',
    color = 'slate',
    action,
}) {
    const colorHex = getColorHex(color);
    const gradientClassNames = getGradientColors(color);

    const [actionTrigger, actionLoading] = useAction(action);

    const Icon = icons[icon || defaultIcon];

    return (
        <button
            className={cn(
                'group relative z-0 flex-center w-full aspect-square overflow-hidden rounded-2xl bg-gradient-to-b transition-all duration-150 ease-in-out active:scale-95',
                { 'scale-95': actionLoading },
                gradientClassNames,
            )}
            type='button'
            onClick={() => actionTrigger()}
        >
            {actionLoading && (
                <div className='hidden absolute z-10 inset-0 flex-center bg-white opacity-50'>
                    <BounceLoader color={colorHex} />
                </div>
            )}

            <div className='absolute z-10 bottom-0 w-full h-12 flex-center transition-all duration-150 ease-in-out translate-y-12 group-hover:translate-y-0'>
                {label}
            </div>

            <Icon
                className='relative z-0 block group-hover:-translate-y-3 transition-all duration-150 ease-in-out'
                name={icon}
                size='2.4rem'
            />
        </button>
    );
}
