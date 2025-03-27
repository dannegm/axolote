const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export const clearLogsAction = async () => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/actions`;
    const response = await fetch(url, { method: 'DELETE', headers: { 'x-dnn-tracker': token } });
    return response.json();
};
