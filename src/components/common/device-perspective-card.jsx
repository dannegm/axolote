'use client';
import { useEffect, useRef, useState } from 'react';

export default function DevicePerspectiveCard({ children, className = '' }) {
    const boundingRef = useRef(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

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

            setRotationStyles(el, xRotation, yRotation);
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

    const setRotationStyles = (element, xRotation, yRotation) => {
        element.style.setProperty('--x-rotation', `${xRotation}deg`);
        element.style.setProperty('--y-rotation', `${yRotation}deg`);
    };

    return (
        <div
            ref={el => {
                if (el) {
                    boundingRef.current = el;
                }
            }}
            onClick={() => requestPermission()}
            className={`wrapper group relative transition-transform ease-out ${className}`}
        >
            {children}
            <div className='flare pointer-events-none absolute inset-0' />
        </div>
    );
}
