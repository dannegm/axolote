import { extend, useApplication } from '@pixi/react';
import { Container } from 'pixi.js';

import Sprite from '@/modules/pixi/components/sprite';
import { probabilityPick, sequence } from '@/modules/core/helpers/arrays';

extend({ Container });

export default function Floor() {
    const { app } = useApplication();

    const sprites = [
        ['/apps/flappybird/floor-0.png', 1],
        ['/apps/flappybird/floor-1.png', 0.8],
        ['/apps/flappybird/floor-2.png', 0.5],
        ['/apps/flappybird/floor-3.png', 0.3],
    ];

    const SPRITE_WIDTH = 32;
    const SPRITE_HEIGHT = 64;
    const FLOOR_LENGTH = 10;

    const slices = sequence(FLOOR_LENGTH).map(i => ({
        key: `floor-slice-${i}`,
        source: probabilityPick(sprites),
        positionX: SPRITE_WIDTH * i,
        positionY: app?.screen?.height - SPRITE_HEIGHT,
    }));

    if (!app) return null;

    return (
        <pixiContainer>
            {slices.map(i => (
                <Sprite
                    key={i.key}
                    source={i.source}
                    x={i.positionX}
                    y={i.positionY}
                    scale={1}
                    anchor={{ x: 0, y: 0 }}
                    width={SPRITE_WIDTH}
                    height={SPRITE_HEIGHT}
                />
            ))}
        </pixiContainer>
    );
}
