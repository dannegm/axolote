'use client';
import { useRef } from 'react';

export default function MousePerspectiveCard({ children, className = '' }) {
    const boundingRef = useRef(null);

    const calculateRotationFromMouse = ev => {
        if (!boundingRef.current) return;

        const { left, top, width, height } = boundingRef.current;
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

    return (
        <div
            ref={el => {
                if (el) boundingRef.current = el.getBoundingClientRect();
            }}
            className={`wrapper group relative transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)] ${className}`}
            onMouseMove={calculateRotationFromMouse}
        >
            {children}
            <div className='flare pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]' />
        </div>
    );
}
