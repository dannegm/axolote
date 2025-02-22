'use client';
import { createContext, useContext, useRef } from 'react';
import useSound from 'use-sound';

import html2canvas from 'html2canvas-pro';
import { Camera } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import usePostAction from '@/modules/krystel/hooks/use-post-action';

import Button from './button';

const SaveContext = createContext();

export const SaveContainer = ({ className, children, quote, onPrepare, onSave }) => {
    const html2canvasOptions = {
        allowTaint: true,
        backgroundColor: '#fafafa',
        useCORS: true,
        imageTimeout: 15000,
    };

    const $container = useRef(null);

    const [playCamera] = useSound('/sounds/camera.mp3');

    const postSave = usePostAction({ action: 'save', settings: quote.settings });

    const handleSave = canvas => {
        const link = document.createElement('a');
        link.download = `axolote_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        onSave?.($container, canvas);
        postSave();
    };

    const handlePrepare = () => {
        const children = $container.current.querySelectorAll('*');
        children.forEach(child => {
            const classesToRemove = ['fade-in', 'fade-in-slow', 'fade-slide-up'];
            child.classList.remove(...classesToRemove);
        });

        setTimeout(() => {
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
            <div ref={$container} className={className}>
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
