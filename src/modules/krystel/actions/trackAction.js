'use client';
const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export const trackAction = async ({ sid, referrer, userAgent = 'unknown' }) => {
    const url = `${HOSTNAME}/track?sid=${sid}&ua=${userAgent}`;
    await fetch(url, {
        method: 'POST',
        credentials: 'include',
        referrer,
    });
};
