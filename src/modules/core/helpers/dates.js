import { parse, isValid, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

export const mergeDateAndTime = (date, time) => {
    return setMilliseconds(
        setSeconds(setMinutes(setHours(date, time.getHours()), time.getMinutes()), 0),
        time.getMilliseconds(),
    );
};

export const inferDate = input => {
    if (!input || typeof input !== 'string') return null;

    const now = new Date();

    // If it's ISO, date-fns can parse it directly.
    const iso = new Date(input);
    if (isValid(iso)) return iso;

    const formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'HH:mm', 'HH:mm:ss', 'yyyyMMdd'];

    for (const fmt of formats) {
        const parsed = parse(input, fmt, now);
        if (isValid(parsed)) {
            // If only time was provided, set today's date
            if (fmt === 'HH:mm' || fmt === 'HH:mm:ss') {
                parsed.setFullYear(now.getFullYear());
                parsed.setMonth(now.getMonth());
                parsed.setDate(now.getDate());
            }
            return parsed;
        }
    }

    return null;
};
