import { useEffect, useState } from 'react';
import { extend } from '@pixi/react';
import { Assets, Sprite as PixiSprite } from 'pixi.js';

extend({ Sprite: PixiSprite });

export default function Sprite({ source, ...props }) {
    const [loadedTexture, setLoadedTexture] = useState(null);

    const loadTextures = async () => {
        const texture = await Assets.load(source);
        setLoadedTexture(texture);
    };

    useEffect(() => {
        loadTextures();
    }, []);

    if (!loadedTexture) return null;

    return <pixiSprite texture={loadedTexture} {...props} />;
}
