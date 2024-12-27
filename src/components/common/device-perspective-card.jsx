'use client';
import { useEffect, useState } from 'react';
import Sparkles from 'react-sparkle';

export default function DevicePerspectiveCard({ children, className = '' }) {
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
        document.body.style.setProperty('--x-rotation', `${xRotation}deg`);
        document.body.style.setProperty('--y-rotation', `${yRotation}deg`);
        document.body.style.setProperty('--x', `${xPercentage * 100}%`);
        document.body.style.setProperty('--y', `${yPercentage * 100}%`);
    };

    useEffect(() => requestPermission(), []);

    useEffect(() => {
        const handleOrientation = event => {
            const gamma = event.gamma || 0; // Tilt left/right
            const beta = event.beta || 0; // Tilt front/back

            // Normalize values to percentage range
            const xPercentage = 1 - (gamma + 90) / 180; // gamma range: -90 to 90
            const yPercentage = 1 - ((90 - beta) / 180 + 0.5); // beta range: -90 to 90

            // Calculate rotations
            const xRotation = (xPercentage - 0.5) * 20 * 2.5;
            const yRotation = (0.5 - yPercentage) * 20 * 3.5;

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
            className={`wrapper relative transition-transform ease-out ${className}`}
            style={{
                transform: 'rotateX(var(--x-rotation)) rotateY(var(--y-rotation))',
            }}
        >
            {children}
            {permissionGranted && (
                <div className='absolute inset-0'>
                    <Sparkles color='teal' />
                </div>
            )}

            <div className='flare pointer-events-none absolute inset-0 bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]' />

            {!permissionGranted && (
                <button
                    onClick={requestPermission}
                    className='group absolute bottom-2 left-1/2 -translate-x-1/2 '
                >
                    <div className='relative block bg-cyan-300 text-cyan-800 text-sm py-2 px-4 font-delius rounded-full shadow-lg group-hover:shadow-xl group-active:shadow-md'>
                        Activar resplandor
                        <Sparkles color='teal' overflowPx={8} />
                    </div>
                </button>
            )}
        </div>
    );
}
