import { useEffect, useState } from 'react';
import { extend } from '@pixi/react';
import { Assets, AnimatedSprite as PixiAnimatedSprite } from 'pixi.js';

extend({ AnimatedSprite: PixiAnimatedSprite });

export default function AnimatedSprite({ sources, ...props }) {
    const [loadedTextures, setLoadedTextures] = useState([]);

    const loadTextures = async () => {
        const textures = [];
        for (const src of sources) {
            const texture = await Assets.load(src);
            textures.push(texture);
        }
        setLoadedTextures(textures);
    };

    useEffect(() => {
        loadTextures();
    }, []);

    if (!loadedTextures.length) return null;

    return <pixiAnimatedSprite textures={loadedTextures} {...props} />;
}
