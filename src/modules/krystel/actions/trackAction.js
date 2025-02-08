'use client';
const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export const trackAction = async ({ referrer, userAgent = 'unknown' }) => {
    const url = `${HOSTNAME}/track?ua=${userAgent}`;
    await fetch(url, {
        method: 'POST',
        credentials: 'include',
        referrer,
    });
};
