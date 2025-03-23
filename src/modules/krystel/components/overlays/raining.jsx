import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import ReactRain from 'react-rain-animation';
import 'react-rain-animation/lib/style.css';

import { cn } from '@/modules/core/helpers/utils';
import useAudio from '@/modules/core/hooks/use-audio';

const defaultIntensity = {
    numDrops: 500,
    fog: 0.45,
    volume: 0.25,
};

export default function Raining({ show, intensity = {} }) {
    const finalIntensity = {
        ...defaultIntensity,
        ...intensity?.rain,
    };

    const [playSound, pauseSound] = useAudio({
        src: './sounds/raining.mp3',
        loop: true,
        volume: finalIntensity?.volume,
        fadeIn: 1500,
        fadeOut: 1500,
    });

    useEffect(() => {
        if (show) {
            playSound();
        } else {
            pauseSound();
        }
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 1.5 }, ease: 'easeInOut' }}
                    className={cn('absolute inset-0')}
                    key='raining'
                >
                    <div
                        className='absolute inset-0 z-max bg-sky-800/30'
                        style={{
                            opacity: finalIntensity?.fog,
                        }}
                    >
                        <ReactRain numDrops={finalIntensity?.numDrops} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
