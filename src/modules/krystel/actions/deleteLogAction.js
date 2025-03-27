const HOSTNAME = 'https://endpoints.hckr.mx/quotes';

export const deleteLogAction = async actionId => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/actions/${actionId}`;
    const response = await fetch(url, { method: 'DELETE', headers: { 'x-dnn-tracker': token } });
    return response.json();
};
