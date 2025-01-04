import { format } from 'date-fns';

export const isElevenEleven = () => {
    const currentTime = format(new Date(), 'hh:mm');
    return currentTime === '11:11';
};

export const isThreeInTheMorning = () => {
    const currentTime = format(new Date(), 'HH:mm');
    return currentTime === '03:00';
};
