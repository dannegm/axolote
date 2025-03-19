import {
    format,
    isWithinInterval,
    setHours,
    setMinutes,
    setSeconds,
    addDays,
    isSameDay,
} from 'date-fns';

export const isElevenEleven = () => {
    const currentTime = format(new Date(), 'hh:mm');
    return currentTime === '11:11';
};

export const isThreeInTheMorning = () => {
    const currentTime = format(new Date(), 'HH:mm');
    return currentTime === '03:00';
};

export const isTimeInMorningRange = (now = new Date()) => {
    const startTime = setSeconds(setMinutes(setHours(new Date(), 6), 0), 0); // 6:00:00 AM
    const endTime = setSeconds(setMinutes(setHours(new Date(), 10), 0), 0); // 10:00:00 AM

    return isWithinInterval(now, { start: startTime, end: endTime });
};

export const isTimeInNightRange = (now = new Date()) => {
    const startTime = setSeconds(setMinutes(setHours(new Date(), 20), 0), 0); // 8:00 PM
    const endTime = setSeconds(setMinutes(setHours(new Date(), 2), 0), 0); // 2:00 AM (del día siguiente)

    const adjustedEndTime = endTime < startTime ? addDays(endTime, 1) : endTime; // Ajusta si cruza la medianoche

    return isWithinInterval(now, { start: startTime, end: adjustedEndTime });
};

// Between Dec 20th & Jan 15th
export const isBdaySeason = (today = new Date()) => {
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    if (currentMonth !== 11 && currentMonth !== 0) {
        return false;
    }

    if (currentMonth === 11 && currentDay < 20) {
        return false;
    }

    if (currentMonth === 0 && currentDay > 15) {
        return false;
    }

    return true;
};

export const isFoolsDay = (today = new Date()) => {
    const aprilFools = new Date(today.getFullYear(), 3, 1);
    const inocentes = new Date(today.getFullYear(), 11, 28);

    return isSameDay(today, aprilFools) || isSameDay(today, inocentes);
};

export const isWomenDay = (today = new Date()) => {
    const womenDay = new Date(today.getFullYear(), 2, 8);
    return isSameDay(today, womenDay);
};

export const isRoundedDay = (today = new Date()) => {
    const roundedDay = new Date(today.getFullYear(), 2, 14);
    return isSameDay(today, roundedDay);
};
