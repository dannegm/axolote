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
};

export default function Sticker({ id, type = 'inline' }) {
    const src = stickerMap[id];
    if (!src) return `[${id}]`;

    const types = {
        inline: 'inline-block w-5 h-5',
        badge: 'block w-24 h-24 -mt-2 md:-mt-4',
        full: 'block w-44 h-44 -mt-4 -mb-2',
    };

    return <img src={src} alt={id} className={cn('object-contain', types[type])} />;
}
