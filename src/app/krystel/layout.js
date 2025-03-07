import '@/app/globals.css';
import KrystelLayout from '@/modules/krystel/components/layout/krystel-layout';

export const metadata = {
    title: 'Krystel',
    appleWebApp: {
        statusBarStyle: 'black-translucent',
    },
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
};

export default function Layout({ children }) {
    return <KrystelLayout>{children}</KrystelLayout>;
}
