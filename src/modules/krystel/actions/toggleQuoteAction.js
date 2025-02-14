const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const toggleQuoteAction = async ({ quoteId, show }) => {
    const url = `${HOSTNAME}/krystel/${quoteId}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show }),
    });
    return response.json();
};
