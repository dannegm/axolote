const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export const clearLogsAction = async () => {
    const url = `${HOSTNAME}/actions`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.json();
};
