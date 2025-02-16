import Menu from '@/app/krystel/components/menu';
import ToastHost from '@/modules/core/components/common/toast-host';
import QuoteLoader from './components/quote-loader';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
    const { code } = await searchParams;
    const url = code ? `https://axolote.me/krystel?code=${code}` : `https://axolote.me/krystel`;

    return {
        title: 'Krystel',
        description: 'Entra aquí para encontrar un mensaje especial.',
        openGraph: {
            title: 'Krystel',
            description: 'Entra aquí para encontrar un mensaje especial.',
            url,
            type: 'website',
            locale: 'en_US',
        },
    };
}

export default function Krystel() {
    return (
        <>
            <Menu />
            <ToastHost />
            <QuoteLoader />
        </>
    );
}
