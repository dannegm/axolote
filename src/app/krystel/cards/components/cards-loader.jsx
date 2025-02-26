'use client';
import { useQueryState, parseAsBoolean } from 'nuqs';
import useSettings from '@/modules/core/hooks/use-settings';

import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';
import CardsList from './cards-list';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function CardsLoader() {
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActionsQuery] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const skipActions = skipActionsQuery || skipActionsSettings;
    const queryParams = skipActions ? '?skip-actions=true' : '';

    return (
        <DataLoader tags={['cards']} url={`${BASE_URL}/krystel${queryParams}`} loader={<Loader />}>
            {data => <CardsList data={data} />}
        </DataLoader>
    );
}
