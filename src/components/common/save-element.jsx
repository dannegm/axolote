'use client';
import { createContext, useContext, useRef, useState } from 'react';
import useSound from 'use-sound';

import html2canvas from 'html2canvas-pro';
import { Camera } from 'lucide-react';

import { cn } from '@/helpers/utils';

import Button from './button';

const SaveContext = createContext();

const html2canvasOptions = {
    allowTaint: true,
    backgroundColor: '#fafafa',
    useCORS: true,
    imageTimeout: 15000,
};

export const SaveContainer = ({ className, quote, children, onPrepare, onSave }) => {
    const $container = useRef(null);
    const [shotting, setShotting] = useState(false);

    const [playCamera] = useSound('./camera.mp3');

    const handleSave = canvas => {
        const link = document.createElement('a');
        link.download = `axolote_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.target = '_blank';
        link.click();

        onSave?.($container, canvas);
        setShotting(false);

        children.forEach(child => {
            child.style.opacity = '';
            child.style.animation = '';
            child.style.transform = '';
        });

        document.removeChild(link);
    };

    const handlePrepare = () => {
        setShotting(true);

        setTimeout(() => {
            const children = $container.current.querySelectorAll('*');
            children.forEach(child => {
                child.style.opacity = '1';
                child.style.transform = 'none';
                child.style.animation = 'none';
            });

            playCamera();
            onPrepare?.($container);
            html2canvas($container.current, html2canvasOptions).then(handleSave);
        }, 300);
    };

    const save = ev => {
        ev.preventDefault();
        handlePrepare();
    };

    return (
        <SaveContext.Provider value={{ $container, save }}>
            <div
                ref={$container}
                className={className}
                style={{ backgroundImage: shotting ? quote.bg : '' }}
            >
                {children}
            </div>
        </SaveContext.Provider>
    );
};

export const SaveButton = ({ className }) => {
    const { save } = useContext(SaveContext);

    return (
        <Button
            className={cn(
                'bg-blue-500 text-white hover:bg-blue-600 active:bg-yellow-400',
                className,
            )}
            onClick={save}
        >
            <Camera size={20} />
        </Button>
    );
};
