'use client';
import { useEffect, useRef, useState } from 'react';

export default function DevicePerspectiveCard({ children, className = '' }) {
    const boundingRef = useRef(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        const handleDeviceMotion = event => {
            if (!boundingRef.current) return;

            const { width, height } = boundingRef.current;
            const xAcceleration = event.accelerationIncludingGravity?.x || 0;
            const yAcceleration = event.accelerationIncludingGravity?.y || 0;

            // Normalize values to percentage range
            const xPercentage = (xAcceleration + 10) / 20; // Range approx -10 to 10
            const yPercentage = (10 - yAcceleration) / 20;

            // Calculate rotations
            const xRotation = (xPercentage - 0.5) * 20;
            const yRotation = (0.5 - yPercentage) * 20;

            setRotationStyles(boundingRef.current, xRotation, yRotation, xPercentage, yPercentage);
        };

        if (permissionGranted) {
            window.addEventListener('devicemotion', handleDeviceMotion);
        }

        return () => window.removeEventListener('devicemotion', handleDeviceMotion);
    }, [permissionGranted]);

    const setRotationStyles = (element, xRotation, yRotation, xPercentage, yPercentage) => {
        element.style.setProperty('--x-rotation', `${xRotation}deg`);
        element.style.setProperty('--y-rotation', `${yRotation}deg`);
        element.style.setProperty('--x', `${xPercentage * 100}%`);
        element.style.setProperty('--y', `${yPercentage * 100}%`);
    };

    const requestSensorPermission = async () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            try {
                const response = await DeviceMotionEvent.requestPermission();
                if (response === 'granted') setPermissionGranted(true);
            } catch (err) {
                console.error('Permission request denied:', err);
            }
        } else {
            // Fallback for browsers that don't require explicit permission
            setPermissionGranted(true);
        }
    };

    return (
        <div
            ref={el => {
                if (el) boundingRef.current = el.getBoundingClientRect();
            }}
            className={`wrapper relative group transition-transform ease-out [transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)] ${className}`}
        >
            {children}
            <div className='flare pointer-events-none absolute inset-0 bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]' />
            {!permissionGranted && (
                <button
                    onClick={requestSensorPermission}
                    className='absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-blue-500 px-4 py-2 text-white shadow-lg'
                >
                    Activar resplandor
                </button>
            )}
        </div>
    );
}
