import { cn } from '@/modules/core/helpers/utils';

const stickerMap = {
    axolote: '/stickers/axolote.png',
    hi: '/stickers/hi.png',
    hello: '/stickers/hello.png',
    lets_dance: '/stickers/lets_dance.png',
    movie_time: '/stickers/movie_time.png',
    need_a_break: '/stickers/need_a_break.png',
    sun: '/stickers/sun.png',
    ufo: '/stickers/ufo.png',
    pray: '/stickers/pray.png',
    silence: '/stickers/silence.png',
    flowers: '/stickers/flowers.png',
    gift: '/stickers/gift.png',
    rocket: '/stickers/rocket.png',
    snowflakes: '/stickers/snowflakes.png',
    snowy_house: '/stickers/snowy-house.png',
    stars: '/stickers/stars.png',
    constellation: '/stickers/constellation.png',
    secret: '/stickers/secret.png',
    nyancat: '/stickers/nyancat.gif',
};

const customStyles = {
    nyancat: 'rounded-full shadow-xl',
};

export default function Sticker({ id, type = 'inline' }) {
    const src = stickerMap[id];
    if (!src) return `[${id}]`;

    const stickerStyles = customStyles[id] || '';

    const types = {
        inline: 'inline-block w-6 h-6 -mt-1 scale-110',
        badge: 'block w-24 h-24 mx-auto -mt-2 md:-mt-4',
        full: 'block w-44 h-44 mx-auto -mb-2',
        preview: 'block bg-white rounded-md shadow-sm w-16 h-16 p-2',
    };

    return <img src={src} alt={id} className={cn('object-contain', types[type], stickerStyles)} />;
}
