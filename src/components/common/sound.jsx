'use client';

import { useEffect } from 'react';
import useSound from 'use-sound';

export default function Sound({ path, volume = 0.5 }) {
    const [playPop] = useSound(path, { volume });

    useEffect(() => {
        playPop();
    }, [playPop]);

    return <></>;
}
