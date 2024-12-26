'use client';
import { useEffect, useRef, useState } from 'react';

export default function DevicePerspectiveCard({ children, className = '' }) {
    const boundingRef = useRef(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const requestPermission = async () => {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') setPermissionGranted(true);
            } catch (error) {
                console.error('Permission denied', error);
            }
        } else {
            setPermissionGranted(true);
        }
    };

    const setRotationStyles = ({ xRotation, yRotation, xPercentage, yPercentage }) => {
        if (!boundingRef.current) return;
        boundingRef.current.style.setProperty('--x-rotation', `${xRotation}deg`);
        boundingRef.current.style.setProperty('--y-rotation', `${yRotation}deg`);
        boundingRef.current.style.setProperty('--x', `${xPercentage * 100}%`);
        boundingRef.current.style.setProperty('--y', `${yPercentage * 100}%`);
    };

    useEffect(() => {
        const handleOrientation = event => {
            if (!boundingRef.current) return;

            const { width, height } = boundingRef.current;
            const gamma = event.gamma || 0; // Tilt left/right
            const beta = event.beta || 0; // Tilt front/back

            // Normalize values to percentage range
            const xPercentage = (gamma + 90) / 180; // gamma range: -90 to 90
            const yPercentage = (90 - beta) / 180; // beta range: -90 to 90

            // Calculate rotations
            const xRotation = (xPercentage - 0.5) * 20;
            const yRotation = (0.5 - yPercentage) * 20;

            setRotationStyles({ xRotation, yRotation, xPercentage, yPercentage });
        };

        if (permissionGranted) {
            window.addEventListener('deviceorientation', handleOrientation);
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [permissionGranted]);

    return (
        <div
            ref={el => {
                if (el) boundingRef.current = el.getBoundingClientRect();
            }}
            className={`wrapper relative transition-transform ease-out transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation)) ${className}`}
        >
            {children}

            <div className='flare pointer-events-none absolute inset-0 bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]' />

            {!permissionGranted && (
                <button
                    onClick={requestPermission}
                    className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-cyan-300 text-cyan-800 text-sm py-2 px-4 font-delius rounded-full shadow-lg hover:shadow-xl active:shadow-md'
                >
                    Activar resplandor
                </button>
            )}
        </div>
    );
}
