import { memo } from 'react';
import { parseAsString, parseAsBoolean, useQueryState } from 'nuqs';
import { useQuery } from '@tanstack/react-query';

import useSettings from '@/modules/core/hooks/use-settings';

import Layout from '@/modules/krystel/components/layout/layout';
import CardViewer from './components/card-viewer';
import { pickQuoteQuery } from '@/modules/krystel/queries/queries';

const extractQuoteId = code => {
    if (!code) return null;
    const [quoteId] = code.split(':');
    return quoteId;
};

const MemoCardViewer = memo(CardViewer);

export default function Page() {
    const [code] = useQueryState('code', parseAsString.withDefault(''));
    const quoteId = extractQuoteId(code);

    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActionsQuery] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));
    const skipActions = skipActionsQuery || skipActionsSettings;

    const { data, isLoading, error } = useQuery(
        pickQuoteQuery({
            quoteId,
            skipActions,
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
        }),
    );

    if (error) {
        window.location.href = '/krys';
        return null;
    }

    return (
        <Layout>{isLoading ? <></> : <MemoCardViewer code={code} data={data} />}</Layout>
    );
}
