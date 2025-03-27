import { useQueryState, parseAsBoolean } from 'nuqs';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useSettings from '@/modules/core/hooks/use-settings';
import { buildQueryParams } from '@/modules/core/helpers/utils';

import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';

import CardsMain from './cards-main';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function CardsLoader() {
    const [token] = useLocalStorage('app:tracker', null);
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActionsQuery] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));

    const queryParams = buildQueryParams({
        'skip-actions': skipActionsQuery || skipActionsSettings,
    });

    return (
        <DataLoader
            tags={['cards']}
            url={`${BASE_URL}/krystel${queryParams}`}
            headers={{ 'x-dnn-tracker': token }}
            loader={<Loader />}
        >
            {data => <CardsMain data={data} />}
        </DataLoader>
    );
}
