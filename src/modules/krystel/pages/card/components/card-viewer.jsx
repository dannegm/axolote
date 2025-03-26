import { useEffect } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

import { RefreshCcw } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';
import JsonViewer from '@/modules/core/components/common/json-viewer';

import { useOverlays } from '@/modules/krystel/providers/overlays-provider';

import { extractConfigsAndContent } from '@/modules/krystel/helpers/strings';
import { getRandomQuote, quoteFromSettings } from '@/modules/krystel/services/quotes';
import { isDeleted } from '@/modules/krystel/helpers/utils';

import useRemoteEventHandler from '@/modules/krystel/hooks/use-remote-event-handler';

import { SaveContainer, SaveButton } from '@/modules/krystel/components/common/save-element';
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
    const [allowWeather, setAllowWeather] = useSettings('weather:allow', false);

    const { weather } = useOverlays();

    const [, setCodeQuery] = useQueryState('code', parseAsString.withDefault(code));

    const { configs } = extractConfigsAndContent(data?.quote);
    const refreshUrl = configs?.target ?? '/krystel';

    const quote = buildQuoteSettings({ code, data });
    const url = `${getBaseUrl()}?code=${quote.settings}`;
    const deleted = isDeleted(data);

    useEffect(() => {
        if (!code || code.includes('*:*:*:*')) {
            setCodeQuery(quote.settings);
        }
    }, [code, quote]);

    useRemoteEventHandler();

    return (
        <main className='relative z-0 min-h-[calc(100vh-6rem)] sm:min-h-screen flex flex-col flex-center p-4 bg-gray-100 bg-center overflow-hidden'>
            <div
                data-layer='options'
                className={cn('fixed bottom-4 z-[999] flex flex-center flex-row gap-2', {
                    'right-4 flex-row-reverse': actionsDirection === 'ltr',
                    'left-4': actionsDirection === 'rtl',
                })}
            >
                <CardViewerMenu item={data} />
            </div>

            {weather && weather.id !== 'clear' && (
                <div className='absolute z-max top-2 left-1/2 transform -translate-x-1/2'>
                    <Button
                        className={cn('h-8 px-4 gap-2 [&_svg]:size-4 text-sm', {
                            'opacity-50': !allowWeather,
                        })}
                        onClick={() => setAllowWeather(!allowWeather)}
                        variant='outline'
                    >
                        {weather?.icon} {weather?.description}
                    </Button>
                </div>
            )}

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
                <div
                    id='card-bg-portal'
                    className='background fixed inset-0 z-10 transition-all duration-300'
                />
                <div
                    id='custom-bg-portal'
                    className='background fixed inset-0 z-20 transition-all duration-300'
                />
                <div
                    id='global-bg-portal'
                    className='fixed inset-0 z-30 transition-all duration-300'
                />

                <PerspectiveCard className='relative z-50'>
                    <GiftCard {...quote} />
                </PerspectiveCard>

                <div
                    className={cn(
                        'relative z-50 flex flex-row justify-center items-center m-4 gap-4',
                        {
                            'flex-row-reverse': actionsDirection === 'ltr',
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
    );
}
