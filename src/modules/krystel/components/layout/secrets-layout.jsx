import RootLayout from '@/modules/krystel/components/layout/layout';

import Navbar from '@/modules/krystel/pages/secrets/components/navbar';
import QuickSettings from '@/modules/krystel/pages/secrets/components/quick-settings';

export default function SecretsLayout({ title, children }) {
    return (
        <RootLayout title={title}>
            <main className='px-4 md:p-0 max-w-[820px] w-full md:w-3/4 lg:w-4/6 xl:w-3/5 2xl:w-1/2 mx-auto border-t-8 border-gray-300'>
                <div className='flex flex-col gap-2 my-6'>
                    <h1 className='font-pacifico text-3xl text-indigo-950'>Secrets.</h1>
                </div>

                <Navbar />
                <QuickSettings />

                {children}
            </main>
        </RootLayout>
    );
}
