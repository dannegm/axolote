const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const createPostAction = async payload => {
    const url = `${HOSTNAME}/krystel/posts`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return response.json();
};
