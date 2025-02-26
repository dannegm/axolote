'use client';
import { parseAsString, parseAsBoolean, useQueryState } from 'nuqs';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';

import CardViewer from './card-viewer';
import { buildQueryParams } from '@/modules/core/helpers/utils';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

const extractQuoteId = code => {
    if (!code) {
        return null;
    }

    const [quoteId] = code.split(':');
    return quoteId;
};

export default function QuoteLoader() {
    const [code] = useQueryState('code', parseAsString.withDefault(''));
    const quoteId = extractQuoteId(code);

    const [skipActionsSettings] = useLocalStorage('settings:skip_actions', false);
    const [skipActionsQuery] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));
    const skipActions = skipActionsQuery || skipActionsSettings;

    const queryParams = buildQueryParams({
        'quote.id': quoteId,
        'skip-actions': skipActions,
    });

    const handleError = () => {
        window.location.href = '/krystel';
    };

    return (
        <DataLoader
            tags={['quotes']}
            url={`${BASE_URL}/krystel/pick${queryParams}`}
            loader={<Loader />}
            onError={handleError}
            preventRefetch
        >
            {data => <CardViewer code={code} data={data} />}
        </DataLoader>
    );
}
