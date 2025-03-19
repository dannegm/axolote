const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const destroyPostAction = async postId => {
    const url = `${HOSTNAME}/krystel/posts/${postId}/destroy`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.json();
};
