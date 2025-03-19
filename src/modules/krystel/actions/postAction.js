const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export const postAction = async ({ action, quoteId, settings, userAgent = 'unknown' }) => {
    const url = `${HOSTNAME}/${quoteId}/action/${action}?code=${settings}&ua=${userAgent}`;
    const response = await fetch(url, { method: 'POST' });
    return response.json();
};
