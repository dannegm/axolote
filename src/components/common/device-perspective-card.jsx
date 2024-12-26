'use client';
import { useEffect, useRef, useState } from 'react';

export default function DevicePerspectiveCard({ children, className = '' }) {
    const boundingRef = useRef(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [deviceRotation, setDeviceRotation] = useState({ x: 0, y: 0, gamma: 0, beta: 0 });

    const requestPermission = async () => {
        // Solicitar permiso en dispositivos iOS
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    setPermissionGranted(true);
                }
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
            const { beta, gamma } = event;

            // `beta` is the tilt front-to-back (x-axis), and `gamma` is the tilt left-to-right (y-axis)
            const xRotation = (gamma / 90) * 20; // Scale to desired range of rotation
            const yRotation = (beta / 90) * 20;

            setDeviceRotation({ x: xRotation, y: yRotation, gamma, beta });
            setRotationStyles(boundingRef.current, xRotation, yRotation, gamma, beta);
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

    const setRotationStyles = (element, xRotation, yRotation, gamma, beta) => {
        element.style.setProperty('--x-rotation', `${xRotation}deg`);
        element.style.setProperty('--y-rotation', `${yRotation}deg`);
        element.style.setProperty('--x', `${gamma}%`);
        element.style.setProperty('--y', `${beta}%`);
    };

    return (
        <div>
            <div>
                {!permissionGranted && (
                    <button
                        onClick={() => requestPermission()}
                        className='p-2 bg-blue-500 text-white rounded'
                    >
                        Request Permission
                    </button>
                )}
            </div>
            <div
                ref={el => {
                    if (el) {
                        boundingRef.current = el;
                    }
                }}
                onClick={() => requestPermission()}
                style={{
                    '--x-rotation': `${deviceRotation.x}deg`,
                    '--y-rotation': `${deviceRotation.y}deg`,
                    '--x': `${deviceRotation.gamma}%`,
                    '--y': `${deviceRotation.beta}%`,
                }}
                className={`wrapper relative transition-transform ease-out transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation)) ${className}`}
            >
                {children}
                <div className='flare pointer-events-none absolute inset-0 bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]' />
            </div>
        </div>
    );
}
