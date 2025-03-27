const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const destroyPostAction = async postId => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/krystel/posts/${postId}/destroy`;
    const response = await fetch(url, { method: 'DELETE', headers: { 'x-dnn-tracker': token } });
    return response.json();
};
