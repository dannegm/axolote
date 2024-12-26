'use client';
import { useEffect, useRef, useState } from 'react';

export default function DevicePerspectiveCard({ children, className = '' }) {
    const boundingRef = useRef(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [deviceRotation, setDeviceRotation] = useState({
        xRotation: 0,
        yRotation: 0,
        xPercentage: 0,
        yRotation: 0,
    });

    const requestPermission = async () => {
        // Solicitar permiso en dispositivos iOS
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') setPermissionGranted(true);
            } catch (error) {
                console.error('Permission denied', error);
            }
        } else {
            // Si el dispositivo no requiere permisos explícitos, habilitar el acceso
            setPermissionGranted(true);
        }
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

            setDeviceRotation({ xRotation, yRotation, xPercentage, yRotation });
        };

        // Si el permiso fue concedido, escuchamos los cambios en la orientación del dispositivo
        if (permissionGranted) {
            window.addEventListener('deviceorientation', handleOrientation);
        }

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [permissionGranted]);

    return (
        <div
            ref={el => {
                if (el) boundingRef.current = el.getBoundingClientRect();
            }}
            style={{
                '--x-rotation': `${deviceRotation.xRotation}deg`,
                '--y-rotation': `${deviceRotation.yRotation}deg`,
                '--x': `${deviceRotation.xPercentage}%`,
                '--y': `${deviceRotation.yPercentage}%`,
            }}
            className={`wrapper relative transition-transform ease-out transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation)) ${className}`}
        >
            {children}
            <div className='flare pointer-events-none absolute inset-0 bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]' />
            {!permissionGranted && (
                <button
                    onClick={requestPermission}
                    className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl active:shadow-md'
                >
                    Activar resplandor
                </button>
            )}
        </div>
    );
}
