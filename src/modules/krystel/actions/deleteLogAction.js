const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const deleteLogAction = async actionId => {
    const url = `${HOSTNAME}/actions/${actionId}`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.json();
};
