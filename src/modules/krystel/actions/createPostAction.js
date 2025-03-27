const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const createPostAction = async payload => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/krystel/posts`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-dnn-tracker': token },
        body: JSON.stringify(payload),
    });
    return response.json();
};
