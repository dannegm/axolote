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

export const test = {
    ...themplate,
    border: 'bg-red-500',
    icon: 'hidden',
};

export const themes = {
    // ...
    test,
};

export const getTheme = (theme = '') => {
    return themes[theme] || {};
};
