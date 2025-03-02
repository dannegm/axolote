import { extend, useApplication } from '@pixi/react';
import { Container } from 'pixi.js';

import NineSliceSprite from '@/modules/pixi/components/nine-slice-sprite';

extend({ Container });

export default function Pipes({ translate = 0, separation = 0 }) {
    const { app } = useApplication();

    const source = '/apps/flappybird/pipe.png';

    if (!app) return null;

    const nozzleSize = 38;
    const pipeWidth = 64;

    const positionTop = app?.screen?.height / 2 - separation / 2;
    const positionBottom = app?.screen?.height / 2 + separation / 2;
    const positionX = app?.screen?.width - translate + pipeWidth / 2;

    return (
        <pixiContainer>
            <NineSliceSprite
                source={source}
                x={positionX}
                y={positionTop}
                scale={1}
                anchor={{ x: 0.5, y: 1 }}
                leftWidth={pipeWidth / 2}
                rightWidth={pipeWidth / 2}
                topHeight={nozzleSize}
                bottomHeight={nozzleSize}
                width={64}
                height={360}
            />

            <NineSliceSprite
                source={source}
                x={positionX}
                y={positionBottom}
                scale={1}
                anchor={{ x: 0.5, y: 0 }}
                leftWidth={pipeWidth / 2}
                rightWidth={pipeWidth / 2}
                topHeight={nozzleSize}
                bottomHeight={nozzleSize}
                width={64}
                height={360}
            />
        </pixiContainer>
    );
}
