import React, { useCallback, useState } from 'react';
import { useTimescape } from 'timescape/react';
import { Clock3 } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { Input } from '@/modules/shadcn/ui/input';

const timePickerInputBase =
    'font-medium text-sm p-1 inline tabular-nums h-fit border-none outline-hidden select-none content-box caret-transparent rounded-xs min-w-8 text-center transition-all duration-150 focus:bg-foreground/10 focus-visible:ring-0 focus-visible:outline-hidden';
const timePickerSeparatorBase = 'font-medium text-sm text-gray-400';

const DEFAULTS = ['hours', 'minutes', 'am/pm'];

const INPUT_PLACEHOLDERS = {
    hours: 'HH',
    minutes: 'MM',
    'am/pm': 'AM/PM',
};

const TimeGrid = ({ ref, ...props }) => {
    const { format, className, timescape, placeholders } = props;

    const [meridiem, setMeridiem] = useState(timescape.getInputProps('am/pm').value || 'AM');

    const handleMeridiemToggle = () => {
        const newMeridiem = meridiem === 'AM' ? 'PM' : 'AM';
        setMeridiem(newMeridiem);

        const event = { target: { value: newMeridiem } };
        timescape.getInputProps('am/pm')?.onChange?.(event);
    };

    return (
        <div
            className={cn(
                'inline-flex items-center justify-center w-fit h-9 p-1 shadow-2xs',
                className,
                'bg-white border-input rounded-md gap-1 selection:bg-transparent selection:text-foreground',
            )}
            {...timescape.getRootProps()}
            ref={ref}
        >
            <div className='block ml-2.5'>
                <Clock3 className='size-4' />
            </div>
            {format.map((unit, index) => (
                <React.Fragment key={unit}>
                    {unit === 'am/pm' ? (
                        <button
                            type='button'
                            className={cn(timePickerInputBase, {
                                'bg-sky-300/50 focus:bg-sky-300/65': meridiem === 'AM',
                                'bg-orange-300/50 focus:bg-orange-300/65': meridiem === 'PM',
                            })}
                            onClick={handleMeridiemToggle}
                        >
                            {meridiem}
                        </button>
                    ) : (
                        <>
                            <Input
                                className={cn(timePickerInputBase, 'min-w-8', {
                                    'bg-foreground/15': unit === 'am/pm',
                                })}
                                {...timescape.getInputProps(unit)}
                                placeholder={placeholders[unit]}
                            />

                            {index < format.length - 2 && (
                                <span className={timePickerSeparatorBase}>:</span>
                            )}
                        </>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

TimeGrid.displayName = 'TimeGrid';

const DEFAULT_TS_OPTIONS = {
    date: new Date(),
    hour12: true,
};

const TimePicker = ({ ref, ...props }) => {
    const {
        value,
        format = DEFAULTS,
        placeholders,
        dtOptions = DEFAULT_TS_OPTIONS,
        onChange,
        className,
    } = props;

    const handleTimeChange = useCallback(
        nextDate => {
            onChange?.(nextDate);
        },
        [onChange],
    );

    const timescape = useTimescape({
        ...dtOptions,
        ...(value && { date: value }),
        onChangeDate: handleTimeChange,
    });

    return (
        <TimeGrid
            format={format}
            className={className}
            timescape={timescape}
            placeholders={placeholders ?? INPUT_PLACEHOLDERS}
            ref={ref}
        />
    );
};

TimePicker.displayName = 'TimePicker';

export { TimePicker };
