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

const debug = {
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

const white = {
    bg: 'bg-gray-100',
    border: 'bg-none bg-gray-300',
    content: 'bg-white text-gray-900',
};

const dark = {
    bg: 'bg-stone-950',
    border: 'bg-none bg-stone-900',
    content: 'bg-neutral-800 text-white',
};

export const themes = {
    // ...
    debug,
    white,
    dark,
};

export const getTheme = (theme = '') => {
    return themes[theme] || {};
};
