import { useEffect, useState } from 'react';
import { intervalToDuration, isValid } from 'date-fns';
import { match } from '@/modules/core/helpers/utils';
import { inferDate } from '@/modules/core/helpers/dates';
import Frame from './frame';

const DEFAULT_MASK = 'ODhms';

const breakdownDuration = (startDate, endDate, mask) => {
    const base = intervalToDuration({ start: startDate, end: endDate });

    const totalDays = base.days || 0;
    const hasW = mask.includes('W');
    const hasO = mask.includes('O');
    const months = base.months || 0;

    let weeks = 0;
    let days = totalDays;

    const shouldUseWeeks = hasW || (hasO && months === 0);

    if (shouldUseWeeks) {
        weeks = Math.floor(totalDays / 7);
        days = totalDays % 7;
    }

    return {
        years: base.years || 0,
        months,
        weeks,
        days,
        hours: base.hours || 0,
        minutes: base.minutes || 0,
        seconds: base.seconds || 0,
    };
};

const formatUnit = value => value.toString().padStart(2, '0');

const maskBuilder = duration => ch =>
    match({ __value: ch })
        .with({ __value: 'Y' }, () => ({
            key: 'Y',
            label: 'years',
            value: duration.years,
        }))
        .with({ __value: 'M' }, () => ({
            key: 'M',
            label: 'months',
            value: duration.months,
        }))
        .with({ __value: 'W' }, () => ({
            key: 'W',
            label: 'weeks',
            value: duration.weeks,
        }))
        .when(
            v => v.__value === 'O' && duration.months > 0,
            () => ({
                key: 'O-M',
                label: 'months',
                value: duration.months,
            }),
        )
        .when(
            v => v.__value === 'O' && duration.months === 0 && duration.weeks > 0,
            () => ({
                key: 'O-W',
                label: 'weeks',
                value: duration.weeks,
            }),
        )
        .with({ __value: 'D' }, () => ({
            key: 'D',
            label: 'days',
            value: duration.days,
        }))
        .with({ __value: 'h' }, () => ({
            key: 'h',
            label: 'hours',
            value: duration.hours,
        }))
        .with({ __value: 'm' }, () => ({
            key: 'm',
            label: 'mins',
            value: duration.minutes,
        }))
        .with({ __value: 's' }, () => ({
            key: 's',
            label: 'secs',
            value: duration.seconds,
        }))
        .otherwise(() => null)
        .run();

const Digit = ({ label, value }) => {
    return (
        <div className='flex flex-col items-center px-2 py-1 rounded-md bg-gray-900 text-white min-w-12'>
            <span className='text-lg font-mono'>{formatUnit(value ?? 0)}</span>
            <span className='text-[0.6rem] uppercase tracking-wide opacity-80'>{label}</span>
        </div>
    );
};

export default function TimeCounter({ q, d, _m = DEFAULT_MASK }) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!d) {
        return (
            <div className='bg-red-100 border border-red-300 text-red-700 text-sm px-3 py-2 rounded-md w-full max-w-xs'>
                La fecha es obligatoria
            </div>
        );
    }

    const parsedDate = inferDate(d);
    if (!isValid(parsedDate)) {
        return (
            <div className='bg-red-100 border border-red-300 text-red-700 text-sm px-3 py-2 rounded-md w-full max-w-xs'>
                Invalid Date
            </div>
        );
    }

    const nowDate = new Date(now);
    const isPast = nowDate > parsedDate;

    const start = isPast ? parsedDate : nowDate;
    const end = isPast ? nowDate : parsedDate;

    const mask = _m || DEFAULT_MASK;
    const duration = breakdownDuration(start, end, mask);

    const tokens = mask.split('').map(maskBuilder(duration)).filter(Boolean);

    const prefix = isPast ? 'Han pasado' : 'Faltan';

    return (
        <Frame className='flex flex-col gap-3 items-center text-center'>
            {q && <p className='text-md max-w-xs'>{q}</p>}

            {tokens.length > 0 && (
                <div className='flex flex-col gap-1 items-center -mx-8'>
                    <span className='text-xs font-bold uppercase tracking-[0.2em] text-gray-800/50'>
                        {prefix}
                    </span>

                    <div className='flex flex-row flex-wrap justify-center gap-1'>
                        {tokens.map(t => (
                            <Digit key={t.key} label={t.label} value={t.value} />
                        ))}
                    </div>
                </div>
            )}
        </Frame>
    );
}
