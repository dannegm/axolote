import useNtfy from '@/modules/core/hooks/use-ntfy';
import useAudio from '@/modules/core/hooks/use-audio';
import { useToast } from '@/modules/core/providers/toast-provider';
import { useOverlays } from '@/modules/krystel/providers/overlays-provider';

import {
    heartsExplosion,
    starsExplosion,
    snowExplosion,
} from '@/modules/krystel/helpers/particles';

const EVENTS_TOPIC = import.meta.env.NEXT_PUBLIC_EVENTS_TOPIC;

const useSfx = () => {
    const [playPop] = useAudio({
        src: '/sounds/pop.mp3',
    });
    const [playShine] = useAudio({
        src: '/sounds/shine.mp3',
        volume: 0.3,
    });
    const [playJingle] = useAudio({
        src: '/sounds/jingle-bells.mp3',
        volume: 0.3,
    });

    return { playPop, playShine, playJingle };
};

export default function useRemoteEventHandler() {
    const { toogle, summonBalloons } = useOverlays();
    const { showToast } = useToast();
    const { playPop, playShine, playJingle } = useSfx();

    const commands = {
        'particles:hearts': () => {
            heartsExplosion();
            playPop();
        },
        'particles:stars': () => {
            starsExplosion();
            playShine();
        },
        'particles:snow': () => {
            snowExplosion();
            playJingle();
        },

        'toggle:snowing': () => {
            toogle('snowing');
        },
        'toggle:raining': () => {
            toogle('raining');
        },
        'summon:balloons': () => {
            showToast({
                content: '¿Lista para la fiesta 🫢?',
                duration: 15_000,
                onAccept: () => {
                    summonBalloons();
                },
                onCancel: () => {
                    console.log('Nope');
                },
            });
        },
    };

    useNtfy({
        topic: EVENTS_TOPIC,
        onMessage: event => {
            if (commands[event]) {
                commands[event]();
            }
        },
    });
}
