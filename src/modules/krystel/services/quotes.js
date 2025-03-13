import { pickFromIndex, randomIndex } from '@/modules/core/helpers/arrays';

const icons = [
    'Candy',
    'Cake',
    'Gift',
    'PartyPopper',
    'Snowflake',
    'Clover',
    'Cat',
    'Flower',
    'Gem',
    'Lollipop',
    'MoonStar',
    'Origami',
    'Sparkles',
];

const colorSchemes = [
    'bg-pink-100 text-pink-800',
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-red-100 text-red-800',
    'bg-yellow-100 text-yellow-800',
    'bg-teal-100 text-teal-800',
    'bg-indigo-100 text-indigo-800',
    'bg-cyan-100 text-cyan-800',
    'bg-rose-100 text-rose-800',
    'bg-amber-100 text-amber-800',
    'bg-lime-100 text-lime-800',
    'bg-emerald-100 text-emerald-800',
    'bg-sky-100 text-sky-800',
    'bg-fuchsia-100 text-fuchsia-800',
    'bg-violet-100 text-violet-800',
    'bg-orange-100 text-orange-800',
    'bg-neutral-100 text-neutral-800',
    'bg-zinc-100 text-zinc-800',
    'bg-gray-100 text-gray-800',
    'bg-slate-100 text-slate-800',
    'bg-stone-100 text-stone-800',
];

const borderPatterns = [
    '/patterns/border/0.webp',
    '/patterns/border/1.webp',
    '/patterns/border/2.webp',
    '/patterns/border/3.webp',
    '/patterns/border/4.webp',
    '/patterns/border/5.webp',
    '/patterns/border/6.webp',
    '/patterns/border/7.webp',
    '/patterns/border/8.webp',
    '/patterns/border/9.webp',
    '/patterns/border/10.webp',
    '/patterns/border/11.webp',
    '/patterns/border/12.webp',
    '/patterns/border/13.webp',
    '/patterns/border/14.webp',
    '/patterns/border/15.webp',
    '/patterns/border/16.webp',
    '/patterns/border/17.webp',
    '/patterns/border/18.webp',
    '/patterns/border/19.webp',
    '/patterns/border/20.webp',
    '/patterns/border/21.webp',
    '/patterns/border/22.webp',
    '/patterns/border/23.webp',
    '/patterns/border/24.webp',
    '/patterns/border/25.webp',
    '/patterns/border/26.webp',
    '/patterns/border/27.webp',
    '/patterns/border/28.webp',
    '/patterns/border/29.webp',
    '/patterns/border/30.webp',
    '/patterns/border/31.webp',
    '/patterns/border/32.webp',
];

const bgPatterns = [
    '/patterns/bg/0.webp',
    '/patterns/bg/1.webp',
    '/patterns/bg/2.webp',
    '/patterns/bg/3.webp',
    '/patterns/bg/4.webp',
    '/patterns/bg/5.webp',
    '/patterns/bg/6.webp',
    '/patterns/bg/7.webp',
    '/patterns/bg/8.webp',
    '/patterns/bg/9.webp',
    '/patterns/bg/10.webp',
    '/patterns/bg/11.webp',
    '/patterns/bg/12.webp',
    '/patterns/bg/13.webp',
    '/patterns/bg/14.webp',
    '/patterns/bg/15.webp',
    '/patterns/bg/16.webp',
    '/patterns/bg/17.webp',
    '/patterns/bg/18.webp',
    '/patterns/bg/19.webp',
    '/patterns/bg/20.webp',
    '/patterns/bg/21.webp',
    '/patterns/bg/22.webp',
    '/patterns/bg/23.webp',
    '/patterns/bg/24.webp',
    '/patterns/bg/25.webp',
    '/patterns/bg/26.webp',
];

//

export const getRandomSettings = () => {
    return [
        /* icon */ randomIndex(icons),
        /* border */ randomIndex(borderPatterns),
        /* bg */ randomIndex(bgPatterns),
        /* scheme */ randomIndex(colorSchemes),
    ].join(':');
};

export const quoteFromSettings = settings => {
    const [icon, border, bg, schema] = settings.split(':');

    return {
        settings,
        icon: pickFromIndex(icons, icon),
        border: `url(${pickFromIndex(borderPatterns, border)})`,
        bg: `url(${pickFromIndex(bgPatterns, bg)})`,
        scheme: pickFromIndex(colorSchemes, schema),
    };
};

export const getRandomQuote = () => {
    const code = getRandomSettings();
    return quoteFromSettings(code);
};
