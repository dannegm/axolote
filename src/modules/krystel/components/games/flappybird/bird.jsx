import { extend, useApplication } from '@pixi/react';
import { Container } from 'pixi.js';

import AnimatedSprite from '@/modules/pixi/components/animated-sprite';

extend({ Container });

export default function Bird() {
    const { app } = useApplication();

    const sources = [
        '/apps/flappybird/bird-0.png',
        '/apps/flappybird/bird-1.png',
        '/apps/flappybird/bird-2.png',
        '/apps/flappybird/bird-3.png',
    ];

    if (!app) return null;

    return (
        <pixiContainer>
            <AnimatedSprite
                sources={sources}
                x={app?.screen?.width / 2}
                y={app?.screen?.height / 2}
                scale={1}
                anchor={{ x: 0.5, y: 0.5 }}
                animationSpeed={0.1}
                isPlaying
                loop
            />
        </pixiContainer>
    );
}
