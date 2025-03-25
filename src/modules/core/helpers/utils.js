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

export function match(action) {
    let hasMatch = false;
    let finalHandler = null;

    return {
        with(pattern, handler) {
            if (!hasMatch) {
                const entries = Object.entries(pattern);
                const isMatching = entries.every(([key, value]) => {
                    return action[key] === value;
                });

                if (isMatching) {
                    hasMatch = true;
                    finalHandler = handler;
                }
            }
            return this;
        },
        when(matcher, handler) {
            if (!hasMatch && matcher(action)) {
                hasMatch = true;
                finalHandler = handler;
            }
            return this;
        },
        otherwise(handler) {
            if (!hasMatch) {
                finalHandler = handler;
            }
            return this;
        },
        run() {
            return finalHandler?.(action) || finalHandler;
        },
    };
}
