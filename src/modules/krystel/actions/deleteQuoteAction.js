const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const deleteQuoteAction = async quoteId => {
    const url = `${HOSTNAME}/krystel/${quoteId}`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.json();
};
