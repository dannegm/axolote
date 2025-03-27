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
    );
}
