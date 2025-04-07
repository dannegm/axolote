import RootLayout from '@/modules/krystel/components/layout/layout';

import AuthProvider from '@/modules/krystel/providers/auth-provider';

import Navbar from '@/modules/krystel/pages/secrets/components/navbar';
import QuickSettings from '@/modules/krystel/pages/secrets/components/quick-settings';

export default function SecretsLayout({ title, children }) {
    return (
        <RootLayout title={title}>
            <AuthProvider>
                <main className='px-4 md:p-0 w-[min(100%,760px)] mx-auto border-t-8 border-gray-300'>
                    <div className='relative z-100 flex flex-col gap-2 my-6'>
                        <h1 className='font-pacifico text-3xl text-black text-stroke'>Secrets.</h1>
                    </div>

                    <Navbar />
                    <QuickSettings />

                    {children}
                </main>
            </AuthProvider>
        </RootLayout>
    );
}
