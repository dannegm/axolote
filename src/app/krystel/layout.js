import RootLayout from '@/components/layout/root-layout';

export const metadata = {
    title: 'Krystel',
};

export default function Layout({ children }) {
    return <RootLayout>{children}</RootLayout>;
}
