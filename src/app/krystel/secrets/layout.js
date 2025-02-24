import '@/app/globals.css';

import Menu from '@/app/krystel/components/menu';
import Navbar from './components/navbar';

import QuickSettings from './components/quick-settings';
import ClientOnly from '@/modules/core/components/common/client-only';

export const metadata = {
    title: 'Krystel - Admin',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
};

export default function Layout({ children }) {
    return (
        <>
            <Menu />

            <main className='px-4 md:p-0 max-w-[720px] w-full md:w-3/4 lg:w-4/6 xl:w-1/2 mx-auto border-t-8 border-gray-300'>
                <div className='flex flex-col gap-2 my-6'>
                    <h1 className='font-pacifico text-3xl text-indigo-950'>Secrets.</h1>
                </div>

                <Navbar />

                <ClientOnly>
                    <QuickSettings />
                </ClientOnly>

                {children}
            </main>
        </>
    );
}
