import { useEffect } from 'react';

export default function useNtfy({ topic, onMessage }) {
    const handleMessage = event => {
        const data = JSON.parse(event.data);
        onMessage?.(data?.message, event);
    };

    useEffect(() => {
        console.log('Mounting...');
        const socket = new WebSocket(`wss://ntfy.sh/${topic}/ws`);
        socket.addEventListener('message', handleMessage);

        return () => {
            console.log('Unmounting...');
            socket.removeEventListener('message', handleMessage);
            socket.close();
        };
    }, []);
}
