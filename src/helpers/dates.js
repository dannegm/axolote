import { format } from 'date-fns';
import { TZDate } from '@date-fns/tz';

const tzDate = new TZDate(new Date(), 'America/Mazatlan');

export const isElevenEleven = () => {
    const currentTime = format(tzDate, 'hh:mm');
    return currentTime === '11:11';
};

export const isThreeInTheMorning = () => {
    const currentTime = format(tzDate, 'HH:mm');
    return currentTime === '03:00';
};
