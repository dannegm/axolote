'use client';
import { useState, useEffect } from 'react';

const reasonsList = [
    { id: 'r:1', description: 'Porque siempre me haces sonreír.' },
    { id: 'r:2', description: 'Porque contigo todo es más divertido.' },
    { id: 'r:3', description: 'Porque entiendes mis locuras.' },
    { id: 'r:4', description: 'Porque siempre estás ahí para mí.' },
    { id: 'r:5', description: 'Porque me inspiras a ser mejor cada día.' },
    { id: 'r:6', description: 'Porque nuestras charlas son interminables y geniales.' },
    { id: 'r:7', description: 'Porque no importa el tiempo, siempre es especial contigo.' },
];

export default function useReasonsLove() {
    const [reasons, setReasons] = useState([]);
    const channel = new BroadcastChannel('reasons:channel');

    const loadReasons = () => {
        setReasons(
            reasonsList.map(item => ({
                ...item,
                discovered: localStorage.getItem(`reasons:${item.id}`) === 'true',
            })),
        );
    };

    const discover = id => {
        const key = `reasons:${id}`;
        if (localStorage.getItem(key) !== 'true') {
            localStorage.setItem(key, 'true');
            loadReasons();
            channel.postMessage({ type: 'update' });
        }

        const res = reasonsList.find(reason => reason.id === id) || null;
        return res;
    };

    const clearReasons = () => {
        reasonsList.forEach(item => localStorage.removeItem(`reasons:${item.id}`));
        loadReasons();
        channel.postMessage({ type: 'update' });
    };

    const getStats = () => {
        const total = reasonsList.length;
        const discovered = reasons.filter(r => r.discovered).length;
        const remaining = total - discovered;
        const allDiscovered = remaining === 0;

        return { total, discovered, remaining, allDiscovered };
    };

    useEffect(() => {
        loadReasons();

        const handleMessage = event => {
            if (event.data.type === 'update') {
                loadReasons();
            }
        };

        channel.addEventListener('message', handleMessage);
        return () => channel.removeEventListener('message', handleMessage);
    }, []);

    return { reasons, discover, clearReasons, getStats };
}
