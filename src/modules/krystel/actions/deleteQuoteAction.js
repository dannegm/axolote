const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const deleteQuoteAction = async ({ quoteId }) => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/krystel/${quoteId}`;
    const response = await fetch(url, { method: 'DELETE', headers: { 'x-dnn-tracker': token } });
    return response.json();
};
