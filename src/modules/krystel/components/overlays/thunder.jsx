import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/modules/core/helpers/utils';
import useAudio from '@/modules/core/hooks/use-audio';

export default function Thunder({ show }) {
    const [playSound, pauseSound] = useAudio({
        src: './sounds/thunder.mp3',
        loop: true,
        volume: 0.015,
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
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    className={cn('absolute inset-0 z-max animate-thunder mix-blend-lighten')}
                    key='thunder'
                />
            )}
        </AnimatePresence>
    );
}
