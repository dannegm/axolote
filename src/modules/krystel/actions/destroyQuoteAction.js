const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const destroyQuoteAction = async ({ quoteId }) => {
    const url = `${HOSTNAME}/krystel/${quoteId}/destroy`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.json();
};
