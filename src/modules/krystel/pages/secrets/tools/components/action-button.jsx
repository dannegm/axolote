import { icons } from 'lucide-react';
import BounceLoader from 'react-spinners/BounceLoader';

import { useMutation } from '@tanstack/react-query';

import { cn } from '@/modules/core/helpers/utils';
import { getColorHex, getGradientColors } from '@/modules/krystel/helpers/colors';
import { Ntfy } from '@/modules/core/services/ntfy';

const APP_TOPIC = import.meta.env.NEXT_PUBLIC_EVENTS_TOPIC;

const ntfy = new Ntfy(APP_TOPIC);

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
                'group relative z-0 flex-center w-full aspect-square overflow-hidden rounded-2xl bg-linear-to-b transition-all duration-150 ease-in-out active:scale-95',
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
