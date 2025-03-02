'use client';
import Frame from './frame';

import FlappyBirdGame from '@/modules/krystel/components/games/flappybird/game';

export default function FlappyBird() {
    return (
        <Frame fullwidth>
            <FlappyBirdGame />
        </Frame>
    );
}
