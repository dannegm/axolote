import { RefreshCcw } from 'lucide-react';

import PerspectiveCard from '@/components/common/perspective-card';
import GiftCard from '@/components/common/gift-card';
import Button from '@/components/common/button';
import ShareButton from '@/components/common/share-button';
import LikeButton from '@/components/common/like-button';
import { SaveContainer, SaveButton } from '@/components/common/save-element';
import CopyText from '@/components/common/copy-text';

export const dynamic = 'force-dynamic';

const fetchQuote = async (code = undefined) => {
    const codeQuery = code ? `?code=${code}` : '';
    const response = await fetch(`https://endpoints.hckr.mx/krystel/quote${codeQuery}`);
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
        <main className='flex min-h-full flex-col items-center justify-center p-4 bg-gray-100 bg-center overflow-hidden'>
            <SaveContainer className='-mt-4 px-5 py-10 md:px-10 md:py-20 transition-all'>
                <div
                    className='fade-in-slow fixed inset-0 bg-gray-100 bg-center bg-[length:50%] opacity-50 transition-all'
                    style={{ backgroundImage: quote.bg }}
                />

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
    );
}
