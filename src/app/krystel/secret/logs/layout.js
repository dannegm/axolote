import '@/app/globals.css';
import RootLayout from '@/modules/core/components/layout/root-layout';
import Fonts from '@/modules/krystel/providers/fonts';

export const metadata = {
    title: 'Krystel - Logs',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
};

export default function Layout({ children }) {
    return (
        <RootLayout>
            <Fonts>{children}</Fonts>
        </RootLayout>
    );
}
