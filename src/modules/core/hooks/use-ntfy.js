import { useEffect } from 'react';

const EVENTS_TOPIC = process.env.NEXT_PUBLIC_EVENTS_TOPIC;

export default function useNtfy({ onMessage }) {
    const handleMessage = event => {
        const data = JSON.parse(event.data);
        onMessage?.(data?.message, event);
    };

    useEffect(() => {
        console.log('Mounting...');
        const socket = new WebSocket(`wss://ntfy.sh/${EVENTS_TOPIC}/ws`);
        socket.addEventListener('message', handleMessage);

        return () => {
            console.log('Unmounting...');
            socket.removeEventListener('message', handleMessage);
            socket.close();
        };
    }, []);
}
