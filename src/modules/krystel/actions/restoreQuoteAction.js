const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const restoreQuoteAction = async ({ quoteId }) => {
    const url = `${HOSTNAME}/krystel/${quoteId}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleted_at: null }),
    });
    return response.json();
};
