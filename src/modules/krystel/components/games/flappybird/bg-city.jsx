import { extend, useApplication } from '@pixi/react';
import { Container } from 'pixi.js';

import Sprite from '@/modules/pixi/components/sprite';

extend({ Container });

export default function BgCity({ translate = 0, offset = 64 }) {
    const { app } = useApplication();

    const source = '/apps/flappybird/bg.png';

    if (!app) return null;

    return (
        <pixiContainer>
            <Sprite
                source={source}
                x={translate}
                y={app?.screen?.height - offset}
                scale={1}
                anchor={{ x: 0, y: 1 }}
                width={512}
                height={512}
            />
        </pixiContainer>
    );
}
