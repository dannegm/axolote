import { RefreshCcw } from 'lucide-react';

import { getRandomQuote, quoteFromSettings } from '@/modules/krystel/services/quotes';
import QuoteProvider from '@/modules/krystel/providers/quote-provider';

import PerspectiveCard from '@/modules/krystel/components/common/perspective-card';
import GiftCard from '@/modules/krystel/components/common/gift-card';
import Button from '@/modules/krystel/components/common/button';
import ShareButton from '@/modules/krystel/components/common/share-button';
import LikeButton from '@/modules/krystel/components/common/like-button';
import { SaveContainer, SaveButton } from '@/modules/krystel/components/common/save-element';
import CopyText from '@/modules/krystel/components/common/copy-text';
import { parseText, stripedElements } from '@/modules/krystel/components/common/rich-text';

export const dynamic = 'force-dynamic';

const QUOTES_API_URL = 'https://endpoints.hckr.mx/quotes/krystel/pick';

const fetchQuote = async (code = undefined) => {
    if (code) {
        const [quoteId, ...remaining] = code.split(':');
        const response = await fetch(`${QUOTES_API_URL}?quote.id=${quoteId}`);
        const data = await response.json();

        const settings = quoteFromSettings(remaining.join(':'));
        const settingsCode = `${data.id}:${settings.settings}`;

        return {
            ...settings,
            ...data,
            settings: settingsCode,
        };
    }

    const response = await fetch(QUOTES_API_URL);
    const data = await response.json();

    const settings = getRandomQuote();
    const settingsCode = `${data.id}:${settings.settings}`;

    return {
        ...settings,
        ...data,
        settings: settingsCode,
    };
};

export async function generateMetadata({ searchParams }) {
    const { code } = await searchParams;
    const quote = await fetchQuote(code);

    const description = code
        ? parseText(quote.quote, stripedElements)
        : 'Entra aquí para encontrar un mensaje especial.';

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
        <QuoteProvider quote={quote}>
            <main className='flex min-h-full flex-col items-center justify-center p-4 bg-gray-100 bg-center overflow-hidden'>
                <SaveContainer className='-mt-4 px-5 py-10 md:px-10 md:py-20 transition-all'>
                    <div
                        className='background fade-in-slow fixed inset-0 bg-gray-100 bg-center bg-[length:50%] opacity-50 transition-all'
                        style={{ backgroundImage: quote.bg }}
                    />

                    <div id='global-bg-portal' />

                    <PerspectiveCard>
                        <GiftCard {...quote} />
                    </PerspectiveCard>

                    <div
                        className='relative z-10 flex flex-row justify-center items-center m-4 gap-4'
                        data-html2canvas-ignore
                    >
                        <Button as='a' href='/krystel'>
                            <RefreshCcw size={20} />
                        </Button>

                        <ShareButton url={`https://axolote.me/krystel?code=${quote.settings}`} />

                        <SaveButton />

                        <LikeButton {...quote} />
                    </div>
                </SaveContainer>

                <CopyText content={`https://axolote.me/krystel?code=${quote.settings}`}>
                    {quote.settings}
                </CopyText>
            </main>
        </QuoteProvider>
    );
}
