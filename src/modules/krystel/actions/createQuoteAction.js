const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const createQuoteAction = async ({ quote, published_at = new Date() }) => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/krystel`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-dnn-tracker': token },
        body: JSON.stringify({ quote, published_at }),
    });
    return response.json();
};
