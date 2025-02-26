import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const pipe = fns => value => fns.reduce((acc, fn) => fn(acc), value);

export const downloadBase64 = (base64Image, filename = 'file.base64') => {
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const buildQueryParams = (payload, prefix = '?') => {
    const queryParams = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
        if (value) {
            queryParams.append(key, value);
        }
    });

    if (queryParams.size === 0) {
        return '';
    }

    return prefix + queryParams.toString();
};
