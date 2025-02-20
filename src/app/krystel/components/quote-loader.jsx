'use client';
import { parseAsString, useQueryState } from 'nuqs';

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

export default function QuoteLoader() {
    const [code] = useQueryState('code', parseAsString.withDefault(''));
    const quoteId = extractQuoteId(code);
    const codeQuery = quoteId ? `?quote.id=${quoteId}` : '';

    return (
        <DataLoader
            tags={['quotes']}
            url={`${BASE_URL}/krystel/pick${codeQuery}`}
            loader={<Loader />}
            preventRefetch
        >
            {data => <CardViewer code={code} data={data} />}
        </DataLoader>
    );
}
