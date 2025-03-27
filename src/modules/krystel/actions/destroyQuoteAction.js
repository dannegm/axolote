const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const destroyQuoteAction = async ({ quoteId }) => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/krystel/${quoteId}/destroy`;
    const response = await fetch(url, { method: 'DELETE', headers: { 'x-dnn-tracker': token } });
    return response.json();
};
