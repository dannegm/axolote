'use client';

import { useEffect, useState } from 'react';
import { RefreshCcw } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { randomSlice } from '@/modules/core/helpers/arrays';

import { getGradientColors } from '@/modules/krystel/helpers/colors';
import { feelings, feelingsContexts } from '@/modules/krystel/helpers/feelings';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/modules/shadcn/ui/select';

const Feeling = ({ className, classNames, color, active, icon, label, onClick }) => {
    const gradientClassNames = getGradientColors(color);

    return (
        <button
            className={cn(
                'relative flex flex-col items-center justify-center w-full aspect-square overflow-hidden bg-white text-white rounded-2xl shadow-2xs transition-all duration-150 ease-in-out scale-100 active:scale-95',
                {
                    'shadow-xl scale-110': active,
                },
                className,
            )}
            type='button'
            onClick={onClick}
        >
            <div
                className={cn(
                    gradientClassNames,
                    'absolute z-0 inset-0 bg-linear-to-b transition-all duration-150 ease-in-out opacity-40',
                    {
                        'opacity-100': active,
                    },
                    classNames?.background,
                )}
            />
            <span className={cn('relative z-10 text-[2rem] shadow-2xs', classNames?.icon)}>
                {icon}
            </span>
            {label && (
                <span
                    className={cn(
                        'relative z-10 -mt-2 font-bold text-[0.825rem] opacity-85',
                        classNames?.label,
                    )}
                >
                    {label}
                </span>
            )}
        </button>
    );
};

export default function FeelingsEditor({
    className,
    classNames,
    context,
    content,
    props,
    setContent,
    setContext,
}) {
    const [slicedFeelings, setSlicedFeelings] = useState([]);

    const generateSlicedFeelings = () => {
        const sliced = randomSlice(Object.values(feelings), 15);
        setSlicedFeelings(sliced);
        setContent('');
    };

    const handleSelect = selected => {
        setContent(selected);
    };

    const handleSelectChange = value => {
        setContext(value);
    };

    useEffect(() => {
        if (!context && props?.showContextSelector) {
            setContext(feelingsContexts.today_feeling.value);
        }
        generateSlicedFeelings();
    }, []);

    return (
        <div className={cn('flex flex-col gap-4 items-center', className)}>
            {props?.showContextSelector && (
                <Select value={context} onValueChange={handleSelectChange}>
                    <SelectTrigger className={cn('w-full bg-white', classNames?.context)}>
                        <SelectValue placeholder='¿Cómo te sientes hoy?' />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(feelingsContexts).map(({ key, value }) => (
                            <SelectItem key={key} value={value}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            <div
                className={cn(
                    'flex-1 w-full grid gap-2 place-items-center grid-cols-4 sm:grid-cols-6 lg:grid-cols-8',
                    classNames?.container,
                )}
            >
                {slicedFeelings.map(({ key, className, color, icon, label }, index) => (
                    <Feeling
                        key={`feeling-${key}`}
                        className={cn(
                            className,
                            {
                                hidden: index >= (props?.feelingsCount || 7),
                                'sm:flex': index < (props?.feelingsCount || 11),
                                'lg:flex': index < (props?.feelingsCount || 15),
                            },
                            classNames?.icon,
                        )}
                        classNames={classNames?.iconClassNames}
                        color={color}
                        icon={icon}
                        label={label}
                        active={content === key}
                        onClick={() => handleSelect(key)}
                    />
                ))}

                <Feeling
                    className={cn(
                        'w-10 h-10 text-white rounded-full shadow-none scale-100 active:scale-95',
                        classNames?.refresh,
                    )}
                    classNames={{
                        background: cn('bg-gray-300', classNames?.refreshClassNames?.background),
                        icon: cn('[&_svg]:size-5', classNames?.refreshClassNames?.icon),
                    }}
                    icon={<RefreshCcw />}
                    onClick={() => generateSlicedFeelings()}
                    active
                />
            </div>
        </div>
    );
}
