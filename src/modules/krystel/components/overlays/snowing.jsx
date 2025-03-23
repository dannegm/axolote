import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import Snowfall from 'react-snowfall';

import { cn } from '@/modules/core/helpers/utils';
import useAudio from '@/modules/core/hooks/use-audio';
import Portal from '@/modules/core/components/common/portal';

const defaultIntensity = {
    color: '#ffffff',
    snowflakeCount: 320,
    speed: [0.5, 2.5],
    wind: [-0.5, 0.5],
    radius: [1.5, 3.5],
    fog: 0.45,
};

export default function Snowing({ show, color, intensity = {} }) {
    const finalIntensity = {
        ...defaultIntensity,
        ...intensity?.snow,
        color,
    };

    const [playSound, pauseSound] = useAudio({
        src: './sounds/chimes.mp3',
        loop: true,
        volume: 0.1,
        fadeIn: 3000,
        fadeOut: 3000,
    });

    useEffect(() => {
        if (show) {
            playSound();
        } else {
            pauseSound();
        }
    }, [show]);

    return (
        <>
            {show && (
                <style>
                    {
                        /* css */ `
                    .background:not(#global-bg-portal) {
                        filter: brightness(1) contrast(1) sepia(1) saturate(1) hue-rotate(180deg);
                    }
                    .gift-card {
                        filter: brightness(1) contrast(1) sepia(1) saturate(3) hue-rotate(180deg);
                        z-index: 10;
                    }
                    `
                    }
                </style>
            )}

            <AnimatePresence>
                {show && (
                    <Portal portalId='global-bg-portal'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ opacity: { duration: 1.5 }, ease: 'easeInOut' }}
                            className={cn('absolute inset-0')}
                            key='snowing-back'
                        >
                            <div
                                className={cn('absolute inset-0 bg-sky-900 transition-all')}
                                style={{
                                    opacity: finalIntensity?.fog,
                                }}
                            />
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ opacity: { duration: 1.5 }, ease: 'easeInOut' }}
                        className={cn('absolute inset-0 z-max')}
                        key='snowing'
                    >
                        <Snowfall {...finalIntensity} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
