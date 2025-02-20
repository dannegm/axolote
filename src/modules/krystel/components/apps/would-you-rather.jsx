'use client';
import Frame from './frame';

export default function WouldYouRather({ a = 'esto', b = 'esto' }) {
    return (
        <Frame className='bg-white px-2 py-4 rounded-2xl shadow-md'>
            <h2>¿Qué prefieres?</h2>
            <p>{a}</p>
            <p>- or -</p>
            <p>{b}</p>
        </Frame>
    );
}
