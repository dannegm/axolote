const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const deletePostAction = async postId => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/krystel/posts/${postId}`;
    const response = await fetch(url, { method: 'DELETE', headers: { 'x-dnn-tracker': token } });
    return response.json();
};
