export const themplate = {
    bg: '',
    card: '',
    border: '',
    container: '',
    content: '',
    badge: '',
    header: '',
    name: '',
    nameUWU: '',
    icon: '',
    text: '',
    greetings: '',
    date: '',
};

export const debug = {
    bg: 'outline-pink-500 outline-dashed outline-1',
    card: 'outline-pink-500 outline-dashed outline-1',
    border: 'outline-pink-500 outline-dashed outline-1',
    container: 'outline-pink-500 outline-dashed outline-1',
    content: 'outline-pink-500 outline-dashed outline-1',
    badge: 'outline-pink-500 outline-dashed outline-1',
    header: 'outline-pink-500 outline-dashed outline-1',
    name: 'outline-pink-500 outline-dashed outline-1',
    nameUWU: 'outline-pink-500 outline-dashed outline-1',
    icon: 'outline-pink-500 outline-dashed outline-1',
    text: 'outline-pink-500 outline-dashed outline-1',
    greetings: 'outline-pink-500 outline-dashed outline-1',
    date: 'outline-pink-500 outline-dashed outline-1',
};

export const themes = {
    // ...
    debug,
};

export const getTheme = (theme = '') => {
    return themes[theme] || {};
};
