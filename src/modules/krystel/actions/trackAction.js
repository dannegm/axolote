const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export const trackAction = async ({ sid, referrer, userAgent = 'unknown' }) => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/track?sid=${sid}&ua=${userAgent}`;
    await fetch(url, {
        method: 'POST',
        referrer,
        headers: { 'x-dnn-tracker': token },
    });
};
