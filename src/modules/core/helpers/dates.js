import { setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

export const mergeDateAndTime = (date, time) => {
    return setMilliseconds(
        setSeconds(setMinutes(setHours(date, time.getHours()), time.getMinutes()), 0),
        time.getMilliseconds(),
    );
};
