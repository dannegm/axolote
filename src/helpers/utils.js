import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const pipe = fns => value => fns.reduce((acc, fn) => fn(acc), value);
