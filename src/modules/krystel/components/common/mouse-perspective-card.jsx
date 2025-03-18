'use client';
import { cn } from '@/modules/core/helpers/utils';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Sparkles from 'react-sparkle';

export default function MousePerspectiveCard({ children, className = '' }) {
    const $bounding = useRef(null);
    const [allowPerspective, setAllowPerspective] = useState(null);

    const calculateRotationFromMouse = ev => {
        if (!$bounding.current) return;
        const { left, top, width, height } = $bounding.current;

        if (!allowPerspective) return;

        const x = ev.clientX - left;
        const y = ev.clientY - top;

        const xPercentage = x / width;
        const yPercentage = y / height;

        const xRotation = (xPercentage - 0.5) * 20;
        const yRotation = (0.5 - yPercentage) * 20;

        setRotationStyles(ev.currentTarget, xRotation, yRotation, xPercentage, yPercentage);
    };

    const setRotationStyles = (element, xRotation, yRotation, xPercentage, yPercentage) => {
        // if (!element) return;
        element.style.setProperty('--x-rotation', `${xRotation}deg`);
        element.style.setProperty('--y-rotation', `${yRotation}deg`);
        element.style.setProperty('--x', `${xPercentage * 100}%`);
        element.style.setProperty('--y', `${yPercentage * 100}%`);
    };

    const perspectiveStyles =
        'hover:rotate-x-(--x-rotation) hover:rotate-y-(--y-rotation) hover:scale-[1.02]';

    useEffect(() => {
        const { height } = $bounding.current;
        setAllowPerspective(height <= 640);
    }, [$bounding.current]);

    return (
        <div
            ref={el => {
                if (el) $bounding.current = el.getBoundingClientRect();
            }}
            className={cn(
                'h-auto wrapper group relative transition-transform ease-out',
                { [perspectiveStyles]: allowPerspective },
                className,
            )}
            onMouseMove={calculateRotationFromMouse}
        >
            {children}
            <div className='absolute inset-0 pointer-events-none'>
                <Sparkles color='teal' />
            </div>
            <div className='flare pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.15)_20%,transparent_60%)]' />
        </div>
    );
}
