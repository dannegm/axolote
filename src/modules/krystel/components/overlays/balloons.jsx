import { useImperativeHandle, useState } from 'react';

import { useToast } from '@/modules/core/providers/toast-provider';
import useAudio from '@/modules/core/hooks/use-audio';
import PrimitiveBalloons from '@/modules/krystel/components/common/balloons';

const BALLOONS_COUNT = 6;

export default function Balloons({ ref, onPopAll, onPop, onStart }) {
    const { showToast } = useToast();
    const [show, setShow] = useState(false);

    const [playPartySound, pausePartySound] = useAudio({
        src: './sounds/little-happy-tune.mp3',
        volume: 0.3,
        fadeIn: 1500,
        fadeOut: 1500,
        loop: true,
    });

    const summonBalloons = () => {
        if (show) return;

        onStart?.();
        playPartySound();

        setShow(true);

        showToast({
            content: 'Rompe todos los globos! 🎈✨',
            duration: 15_000,
        });
    };

    const handleBalloonsPopAll = () => {
        onPopAll?.();
        pausePartySound();
        setShow(false);
    };

    useImperativeHandle(ref, () => ({
        summonBalloons,
    }));

    return (
        <div ref={ref}>
            {show && (
                <PrimitiveBalloons
                    count={BALLOONS_COUNT}
                    onPopAll={handleBalloonsPopAll}
                    onPop={onPop}
                    loop
                />
            )}
        </div>
    );
}
