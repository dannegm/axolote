import { useEffect } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

import { RefreshCcw } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';
import ClientOnly from '@/modules/core/components/common/client-only';
import JsonViewer from '@/modules/core/components/common/json-viewer';

import { extractConfigsAndContent } from '@/modules/krystel/helpers/strings';
import { getRandomQuote, quoteFromSettings } from '@/modules/krystel/services/quotes';
import { isDeleted } from '@/modules/krystel/helpers/utils';

import { SaveContainer, SaveButton } from '@/modules/krystel/components/common/save-element';
import RemoteEventHandler from '@/modules/krystel/components/common/remote-event-handler';
import PerspectiveCard from '@/modules/krystel/components/common/perspective-card';
import GiftCard from '@/modules/krystel/components/common/gift-card';
import Button from '@/modules/krystel/components/common/button';
import ShareButton from '@/modules/krystel/components/common/share-button';
import LikeButton from '@/modules/krystel/components/common/like-button';
import CopyText from '@/modules/krystel/components/common/copy-text';
import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';

import CardViewerMenu from './card-viewer-menu';

const getBaseUrl = () => window.location.origin + window.location.pathname;

const buildQuoteSettings = ({ code, data }) => {
    let settings = getRandomQuote();

    if (code) {
        const [, ...remainingSettings] = code.split(':');
        settings = quoteFromSettings(remainingSettings.join(':'));
    }

    let settingsCode = `${data.id}:${settings.settings}`;

    return {
        ...data,
        ...settings,
        settings: settingsCode,
    };
};

export default function CardViewer({ code, data }) {
    const [debugMode] = useSettings('settings:debug_mode', false);
    const [actionsDirection] = useSettings('viewer:actions_direction', 'ltr');

    const [, setCodeQuery] = useQueryState('code', parseAsString.withDefault(code));

    const { configs } = extractConfigsAndContent(data?.quote);
    const refreshUrl = configs?.target ?? '/krystel';

    const quote = buildQuoteSettings({ code, data });
    const url = `${getBaseUrl()}?code=${quote.settings}`;
    const deleted = isDeleted(data);

    useEffect(() => {
        if (!code) {
            setCodeQuery(quote.settings);
        }
    }, [code, quote]);

    return (
        <ClientOnly>
            <main className='flex min-h-full flex-col items-center justify-center p-4 bg-gray-100 bg-center overflow-hidden'>
                <CardViewerMenu className='absolute top-4 right-4 z-50' item={data} />

                {!data?.show && (
                    <div className='fixed z-50 top-0 left-0 right-0 h-2 bg-sky-500 shadow-sm' />
                )}

                {deleted && (
                    <div className='fixed z-50 top-0 left-0 right-0 h-2 bg-rose-500 shadow-sm' />
                )}

                {debugMode && (
                    <div className='max-w-[398px] w-full mt-12 mb-2 md:-mb-12'>
                        <GiftCardPreview quote={quote.quote} code={quote.settings} preview />
                    </div>
                )}

                <SaveContainer
                    className='-mt-4 w-fit px-5 py-10 md:px-10 md:py-20 transition-all'
                    quote={quote}
                >
                    <RemoteEventHandler quote={quote} />

                    <div id='global-bg-portal' />
                    <div id='card-bg-portal' />

                    <PerspectiveCard>
                        <GiftCard {...quote} />
                    </PerspectiveCard>

                    <div
                        className={cn(
                            'relative z-10 flex flex-row justify-center items-center m-4 gap-4',
                            {
                                'flex-row-reverse': actionsDirection === 'rtl',
                            },
                        )}
                        data-html2canvas-ignore
                    >
                        <Button as='a' href={refreshUrl}>
                            <RefreshCcw size={20} />
                        </Button>

                        <ShareButton url={url} quote={quote} />

                        <SaveButton />

                        <LikeButton {...quote} />
                    </div>
                </SaveContainer>

                {debugMode && (
                    <div className='min-w-80 max-w-full -mt-14 mb-16 p-2 overflow-hidden z-100 flex flex-col gap-2 items-center'>
                        <CopyText content={url}>{quote.settings}</CopyText>
                        <JsonViewer name='payload' data={quote} />
                    </div>
                )}
            </main>
        </ClientOnly>
    );
}
