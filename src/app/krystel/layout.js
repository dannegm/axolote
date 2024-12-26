import RootLayout from '@/components/layout/root-layout';

export const metadata = {
    title: 'Krystel',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function Layout({ children }) {
    return <RootLayout>{children}</RootLayout>;
}
