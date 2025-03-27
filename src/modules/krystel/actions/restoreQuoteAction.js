const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const restoreQuoteAction = async ({ quoteId }) => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/krystel/${quoteId}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-dnn-tracker': token },
        body: JSON.stringify({ deleted_at: null }),
    });
    return response.json();
};
