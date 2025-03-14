export const themplate = {
    bg: '',
    card: '',
    animation: '',
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
    animation: 'outline-pink-500 outline-dashed outline-1',
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

const deepPurple = {
    bg: 'bg-purple-300 mix-blend-overlay',
    border: 'bg-wave-purple',
    content: 'bg-purple-100 text-purple-800',
};

const fools = {
    border: 'relative shadow-(--shadow-upsidedown) overflow-hidden before:absolute before:-inset-[200%] before:block before:chromatic-wheel before:animate-spin before:duration-[5s]',
    content: 'shadow-(--shadow-upsidedown)',
};

const rounded = {
    border: 'relative rounded-full group-[:has(.letter)]:rounded-[32px] group-[:has(.fullscreen)]:rounded-[48px] overflow-hidden before:absolute before:-inset-[200%] before:block before:aqua-gradient before:animate-spin before:duration-[5s]',
    content:
        'rounded-full group-[:has(.letter)]:rounded-[28px] group-[:has(.fullscreen)]:rounded-[32px]',
    date: '[&_.long]:hidden [&_.short]:inline group-[:has(.letter)]:[&_.long]:inline group-[:has(.letter)]:[&_.short]:hidden',
};

export const themes = {
    // ...
    debug,
    white,
    dark,
    deepPurple,
    fools,
    rounded,
};

export const getTheme = (theme = '') => {
    return themes[theme] || {};
};
