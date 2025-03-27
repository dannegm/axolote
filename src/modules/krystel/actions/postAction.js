const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export const postAction = async ({ action, quoteId, settings, userAgent = 'unknown' }) => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/${quoteId}/action/${action}?code=${settings}&ua=${userAgent}`;
    const response = await fetch(url, { method: 'POST', headers: { 'x-dnn-tracker': token } });
    return response.json();
};
