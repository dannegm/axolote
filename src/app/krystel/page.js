import { RefreshCcw } from 'lucide-react';

import { getRandomQuote, quoteFromSettings } from '@/services/quotes';

import PerspectiveCard from '@/components/common/perspective-card';
import GiftCard from '@/components/common/gift-card';
import LikeButton from '@/components/common/like-button';
import ShareButton from '@/components/common/share-button';

export const dynamic = 'force-dynamic';

const getQuote = code => {
    if (code) {
        return quoteFromSettings(code);
    }

    return getRandomQuote();
};

export async function generateMetadata({ searchParams }) {
    const { code } = await searchParams;
    const quote = getQuote(code);

    const description= code ? quote.quote : 'Entra aquí para encontrar un mensaje especial.',

    return {
        title: 'Krystel',
        description,
        openGraph: {
            title: 'Krystel',
            description,
            url: `https://axolote.me/krystel?code=${quote.settings}`,
            type: 'website',
            locale: 'en_US',
        },
    };
}

export default async function Home({ searchParams }) {
    const { code } = await searchParams;
    const quote = getQuote(code);

    return (
        <main
            style={{ backgroundImage: quote.bg }}
            className='flex min-h-full flex-col items-center justify-center p-4 bg-gray-100 bg-center overflow-hidden'
        >
            <div className='fade-out fixed inset-0 z-0 bg-gray-100' />

            <PerspectiveCard className='-mt-4'>
                <GiftCard {...quote} />
            </PerspectiveCard>

            <div className='relative z-10 flex flex-row justify-center items-center m-4 gap-4'>
                <a
                    className='flex flex-row gap-2 justify-center items-center px-6 py-3 rounded-full shadow-md font-delius bg-white text-gray-800 hover:shadow-lg hover:bg-gray-50 active:shadow-sm transition-all duration-200 hover:scale-110 active:scale-100'
                    href='/krystel'
                >
                    Another
                    <RefreshCcw size={20} />
                </a>

                <ShareButton
                    title={''}
                    text={''}
                    url={`https://axolote.me/krystel?code=${quote.settings}`}
                />

                <LikeButton {...quote} />
            </div>
        </main>
    );
}
