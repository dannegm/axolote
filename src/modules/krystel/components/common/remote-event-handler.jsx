'use client';
import { useState } from 'react';
import useSound from 'use-sound';

import Snowfall from 'react-snowfall';
import ReactRain from 'react-rain-animation';
import 'react-rain-animation/lib/style.css';

import { useToast } from '@/modules/core/providers/toast-provider';
import { cn } from '@/modules/core/helpers/utils';
import useNtfy from '@/modules/core/hooks/use-ntfy';
import useAudio from '@/modules/core/hooks/use-audio';
import Portal from '@/modules/core/components/common/portal';
import Audio from '@/modules/core/components/common/audio';

import usePostAction from '@/modules/krystel/hooks/use-post-action';

import {
    heartsExplosion,
    starsExplosion,
    snowExplosion,
} from '@/modules/krystel/helpers/particles';

import Balloons from './balloons';

const EVENTS_TOPIC = process.env.NEXT_PUBLIC_EVENTS_TOPIC;

const snowFallConfig = {
    color: '#ffffff',
    snowflakeCount: 320,
    speed: [0.5, 2.5],
    wind: [-0.5, 0.5],
    radius: [1.5, 3.5],
};

const useSfx = () => {
    const [playPop] = useSound('/sounds/pop.mp3');
    const [playShine] = useSound('/sounds/shine.mp3', {
        volume: 0.3,
    });
    const [playJingle] = useSound('/sounds/jingle-bells.mp3', {
        volume: 0.3,
    });

    return { playPop, playShine, playJingle };
};

const useToggles = () => {
    const [toggles, setToggles] = useState({
        snowing: false,
        raining: false,
        balloons: false,
    });

    const handleToggle = key => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return [toggles, handleToggle];
};

export default function RemoteEventHandler({ quote }) {
    const { showToast } = useToast();
    const { playPop, playShine, playJingle } = useSfx();

    const [toggles, handleToggle] = useToggles();

    const [balloonWaves, setBalloonWaves] = useState([]);

    const [playPartySound, pauseParySound] = useAudio({
        src: './sounds/little-happy-tune.mp3',
        volume: 0.3,
        fadeIn: 1500,
        fadeOut: 1500,
        loop: true,
    });

    const postBalloonsComplete = usePostAction({
        action: 'balloons',
        settings: quote.settings,
    });
    const postBalloonsStart = usePostAction({
        action: 'balloons-start',
        settings: quote.settings,
    });

    const summonBalloons = (count = 6) => {
        playPartySound();
        postBalloonsStart();

        setBalloonWaves(prev => {
            const key = `balloon-wave-${Date.now()}`;
            return [...prev, { key, count }];
        });

        showToast({
            content: 'Rompe todos los globos! 🎈✨',
            duration: 15_000,
        });
    };

    const handleBalloonsPopAll = () => {
        postBalloonsComplete();
        pauseParySound();

        setTimeout(() => {
            window.location.href = '/krystel?code=128:6:23:20:2';
        }, 1500);
    };

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
            handleToggle('snowing');
        },
        'toggle:balloons': () => {
            handleToggle('balloons');
        },
        'toggle:raining': () => {
            handleToggle('raining');
        },
        'summon:balloons': () => {
            // summonBalloons();
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

    return (
        <>
            <Portal portalId='global-bg-portal'>
                <div>
                    {balloonWaves.map(({ key, count }) => (
                        <Balloons key={key} count={count} onPopAll={handleBalloonsPopAll} loop />
                    ))}
                </div>
            </Portal>

            {toggles.snowing && (
                <Portal portalId='global-bg-portal'>
                    <Audio src='./sounds/chimes.mp3' volume={0.1} fadeIn={3000} autoplay loop />
                    <style>
                        {
                            /* css */ `
                        .background {
                            filter: brightness(1) contrast(1) sepia(1) saturate(1) hue-rotate(180deg);
                        }
                        .gift-card {
                            filter: brightness(1) contrast(1) sepia(1) saturate(3) hue-rotate(180deg);
                        }
                        `
                        }
                    </style>
                    {/** TODO: Refactor: Abstract to a separate BG component */}
                    <div
                        className={cn(
                            'animate-in fade-in-0 duration-150 ease-in opacity-50',
                            'fixed inset-0 pointer-events-none bg-slate-900 transition-all backdrop-blur-lg',
                        )}
                    />
                    <div
                        className={cn(
                            'animate-in fade-in-0 duration-300 ease-in opacity-100',
                            'fixed inset-0 z-max pointer-events-none',
                        )}
                    >
                        <Snowfall {...snowFallConfig} />
                    </div>
                </Portal>
            )}
            {toggles.raining && (
                <Portal portalId='global-bg-portal'>
                    <Audio src='./sounds/raining.mp3' volume={0.25} fadeIn={1500} autoplay loop />
                    {/** TODO: Refactor: Abstract to a separate BG component */}
                    <div
                        className={cn(
                            'animate-in fade-in-0 duration-300 ease-in opacity-50',
                            'fixed inset-0 z-max pointer-events-none bg-sky-800/30',
                        )}
                    >
                        <ReactRain numDrops={500} />
                    </div>
                </Portal>
            )}
        </>
    );
}
