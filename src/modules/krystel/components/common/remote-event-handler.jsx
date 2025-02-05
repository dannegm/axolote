'use client';
import useSound from 'use-sound';

import Snowfall from 'react-snowfall';
import ReactRain from 'react-rain-animation';
import 'react-rain-animation/lib/style.css';

import useNtfy from '@/modules/core/hooks/use-ntfy';

import Portal from '@/modules/core/components/common/portal';
import Audio from '@/modules/core/components/common/audio';

import {
    heartsExplosion,
    starsExplosion,
    snowExplosion,
} from '@/modules/krystel/helpers/particles';
import { useState } from 'react';

const snowFallConfig = {
    color: '#ffffff',
    snowflakeCount: 320,
    speed: [0.5, 2.5],
    wind: [-0.5, 0.5],
    radius: [1.5, 3.5],
};

const useSfx = () => {
    const [playPop] = useSound('./sounds/pop.mp3');
    const [playShine] = useSound('./sounds/shine.mp3', {
        volume: 0.3,
    });
    const [playJingle] = useSound('./sounds/jingle-bells.mp3', {
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

export default function RemoteEventHandler() {
    const [toggles, handleToggle] = useToggles();
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
            handleToggle('snowing');
        },
        'toggle:balloons': () => {
            handleToggle('balloons');
        },
        'toggle:raining': () => {
            handleToggle('raining');
        },
    };

    useNtfy({
        onMessage: event => {
            if (commands[event]) {
                commands[event]();
            }
        },
    });

    return (
        <>
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
                    <div className='fixed fade-in inset-0 pointer-events-none bg-slate-900 transition-all duration-150 backdrop-blur-lg opacity-50' />
                    <div className='fixed fade-in inset-0 z-max pointer-events-none'>
                        <Snowfall {...snowFallConfig} />
                    </div>
                </Portal>
            )}
            {toggles.raining && (
                <Portal portalId='global-bg-portal'>
                    <Audio src='./sounds/raining.mp3' volume={0.25} fadeIn={1500} autoplay loop />
                    <div className='fixed fade-in inset-0 z-max pointer-events-none bg-sky-800/30'>
                        <ReactRain numDrops={500} />
                    </div>
                </Portal>
            )}
        </>
    );
}
