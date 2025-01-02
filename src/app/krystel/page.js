import { RefreshCcw } from 'lucide-react';

import { getRandomQuote, quoteFromSettings } from '@/services/quotes';

import PerspectiveCard from '@/components/common/perspective-card';
import GiftCard from '@/components/common/gift-card';
import Button from '@/components/common/button';
import ShareButton from '@/components/common/share-button';
import LikeButton, { LikeHandler } from '@/components/common/like-button';

import { SaveContainer, SaveButton } from '@/components/common/save-element';

export const dynamic = 'force-dynamic';

const HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME || 'http://localhost:3000';

const fetchQuote = async (code = undefined) => {
    const codeQuery = code ? `?code=${code}` : '';
    const response = await fetch(`${HOSTNAME}/krystel/api${codeQuery}`);
    return await response.json();
};

export async function generateMetadata({ searchParams }) {
    const { code } = await searchParams;
    const quote = await fetchQuote(code);

    const description = code ? quote.quote : 'Entra aquí para encontrar un mensaje especial.';
    const url = code
        ? `https://axolote.me/krystel?code=${quote.settings}`
        : `https://axolote.me/krystel`;

    return {
        title: 'Krystel',
        description,
        openGraph: {
            title: 'Krystel',
            description,
            url,
            type: 'website',
            locale: 'en_US',
        },
    };
}

export default async function Home({ searchParams }) {
    const { code } = await searchParams;
    const quote = await fetchQuote(code);

    return (
        <main
            style={{ backgroundImage: quote.bg }}
            className='flex min-h-full flex-col items-center justify-center p-4 bg-gray-100 bg-center overflow-hidden'
        >
            <div className='fade-out fixed inset-0 z-0 bg-gray-100' />

            <SaveContainer
                className='relative -mt-4 px-5 py-10 md:px-10 md:py-20 transition-all'
                quote={quote}
            >
                <PerspectiveCard>
                    <LikeHandler quote={quote.quote} settings={quote.settings} type='double'>
                        <GiftCard {...quote} />
                    </LikeHandler>
                </PerspectiveCard>

                <div
                    className='relative z-10 flex flex-row justify-center items-center m-4 gap-4'
                    data-html2canvas-ignore
                >
                    <Button as='a' href='/krystel'>
                        <RefreshCcw size={20} />
                    </Button>

                    <ShareButton
                        title={''}
                        text={''}
                        url={`https://axolote.me/krystel?code=${quote.settings}`}
                    />

                    <SaveButton />

                    <LikeButton {...quote} />
                </div>
            </SaveContainer>
        </main>
    );
}
