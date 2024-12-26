'use client';
import { useEffect, useRef, useState } from 'react';

export default function DevicePerspectiveCard({ children, className = '' }) {
    const [deviceRotation, setDeviceRotation] = useState({ x: 0, y: 0 });
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [orientationData, setOrientationData] = useState({ beta: 0, gamma: 0 });
    const boundingRef = useRef(null);

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
        // Solicitar permiso al cargar el componente
        if (!permissionGranted) {
            requestPermission();
        }

        const handleOrientation = event => {
            const { beta, gamma } = event;

            // Guardamos los valores originales para hacer debug
            setOrientationData({ beta, gamma });

            // `beta` is the tilt front-to-back (x-axis), and `gamma` is the tilt left-to-right (y-axis)
            const xRotation = (gamma / 90) * 20; // Scale to desired range of rotation
            const yRotation = (beta / 90) * 20;

            setDeviceRotation({ x: xRotation, y: yRotation });
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
        <div>
            <div>
                {!permissionGranted && (
                    <button
                        onClick={() => requestPermission()}
                        className='fixed top-1 left-10 z-50 p-2 bg-blue-500 text-white rounded'
                    >
                        Request Permission
                    </button>
                )}
            </div>

            <div
                ref={el => {
                    if (el) {
                        boundingRef.current = el;
                        setRotationStyles(el, deviceRotation.x, deviceRotation.y);
                    }
                }}
                className={`wrapper group relative transition-transform ease-out ${className}`}
                style={{
                    '--x-rotation': `${deviceRotation.x}deg`,
                    '--y-rotation': `${deviceRotation.y}deg`,
                }}
            >
                {children}
                <div className='flare pointer-events-none absolute inset-0' />
            </div>

            {permissionGranted && (
                <div className='debug-info mt-4 p-4 bg-gray-100 rounded'>
                    <h3 className='font-semibold'>Debug Info:</h3>
                    <pre>
                        {JSON.stringify(orientationData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
