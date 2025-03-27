const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

export const postPageViewAction = async ({ page, userAgent = 'unknown' }) => {
    const token = JSON.parse(localStorage.getItem('app:tracker'));
    const url = `${HOSTNAME}/none/action/page_view?ua=${userAgent}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-dnn-tracker': token,
        },
        body: JSON.stringify({ page }),
    });
    return response.json();
};
