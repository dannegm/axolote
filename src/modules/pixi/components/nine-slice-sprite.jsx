import { useEffect, useState } from 'react';
import { extend } from '@pixi/react';
import { Assets, NineSliceSprite as PixiNineSliceSprite } from 'pixi.js';

extend({ NineSliceSprite: PixiNineSliceSprite });

export default function NineSliceSprite({ source, ...props }) {
    const [loadedTexture, setLoadedTexture] = useState(null);

    const loadTextures = async () => {
        const texture = await Assets.load(source);
        setLoadedTexture(texture);
    };

    useEffect(() => {
        loadTextures();
    }, []);

    if (!loadedTexture) return null;

    return <pixiNineSliceSprite texture={loadedTexture} {...props} />;
}
