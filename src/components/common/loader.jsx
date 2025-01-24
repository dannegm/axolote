'use client';
import { ping } from 'ldrs';
import { useLayoutEffect } from 'react';

export default function Loader() {
    useLayoutEffect(() => {
        ping.register();
    }, []);

    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <l-ping size='45' speed='2' color='black'></l-ping>
        </div>
    );
}
