import { memo } from 'react';
import { parseAsString, parseAsBoolean, useQueryState } from 'nuqs';

import { buildQueryParams } from '@/modules/core/helpers/utils';

import useSettings from '@/modules/core/hooks/use-settings';
import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';

import CardViewer from './card-viewer';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

const extractQuoteId = code => {
    if (!code) {
        return null;
    }

    const [quoteId] = code.split(':');
    return quoteId;
};

const MemoCardViewer = memo(CardViewer);

export default function QuoteLoader() {
    const [code] = useQueryState('code', parseAsString.withDefault(''));
    const quoteId = extractQuoteId(code);

    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
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
            loader={<></>}
            onError={handleError}
            retry={false}
            preventRefetch
        >
            {data => <MemoCardViewer code={code} data={data} />}
        </DataLoader>
    );
}
