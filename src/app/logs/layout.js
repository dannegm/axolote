import RootLayout from '@/components/layout/root-layout';
import Fonts from '@/providers/fonts';

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
