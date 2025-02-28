'use client';

import useFingerprint from '@/modules/core/hooks/use-fingerprint';

export default function Fingerprint() {
    const fingerprint = useFingerprint();

    return (
        <main className='w-full h-screen flex-center flex-col gap-2'>
            <h1 className='font-pacifico text-2xl -mt-32 text-center'>Test</h1>
            <p className='text-sm py-0.5 px-1 rounded-md bg-pink-200 text-pink-800 text-pink-600s font-mono'>
                {fingerprint}
            </p>
        </main>
    );
}
