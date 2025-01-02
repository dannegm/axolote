import { cn } from '@/helpers/utils';

const stickerMap = {
    hello: '/stickers/hello.png',
    lets_dance: '/stickers/lets_dance.png',
    movie_time: '/stickers/movie_time.png',
    need_a_break: '/stickers/need_a_break.png',
    sun: '/stickers/sun.png',
};

export default function Sticker({ id, type = 'inline' }) {
    const src = stickerMap[id];
    if (!src) return `[${id}]`;

    const types = {
        inline: 'inline-blockw-5 h-5',
        badge: 'block w-24 h-24 m-0 md:m-4',
        full: 'block w-44 h-44 -mt-4 -mb-2',
    };

    return <img src={src} alt={id} className={cn('object-contain', types[type])} />;
}
