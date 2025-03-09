import { redirect } from 'next/navigation';

export const DEBUG = process.env.DEBUG === 'true';
export const TARGET = process.env.TARGET || 'https://danielgarcia.me/';

export const GET = () => {
    if (DEBUG) {
        return redirect('/krystel');
    }

    return redirect(TARGET);
};
