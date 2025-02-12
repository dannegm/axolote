import '@/app/globals.css';
import KrystelLayout from '@/modules/krystel/components/layout/krystel-layout';

export const metadata = {
    title: 'Krystel',
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
