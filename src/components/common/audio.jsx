'use client';

import { useLayoutEffect, useRef } from 'react';

export default function Audio({ src, volume = 1, autoplay = false, loop = false }) {
    const $audio = useRef(null);
    useLayoutEffect(() => {
        $audio.current.volume = volume;
    }, [$audio.current]);

    return <audio ref={$audio} src={src} volume={volume} loop={loop} autoPlay={autoplay} />;
}
