const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const deletePostAction = async postId => {
    const url = `${HOSTNAME}/krystel/posts/${postId}`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.json();
};
