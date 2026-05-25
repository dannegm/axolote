import { useQueryState, parseAsBoolean } from 'nuqs';
import { useQuery } from '@tanstack/react-query';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useSettings from '@/modules/core/hooks/use-settings';

import Layout from '@/modules/krystel/components/layout/layout';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import Loader from '@/modules/core/components/common/loader';
import CardsMain from './components/cards-main';
import { cardsQuery } from '@/modules/krystel/queries/krystel-queries';

export default function Page() {
    const [token] = useLocalStorage('app:tracker', null);
    const [skipActionsSettings] = useSettings('settings:skip_actions', false);
    const [skipActionsQuery] = useQueryState('skip-actions', parseAsBoolean.withDefault(false));
    const skipActions = skipActionsQuery || skipActionsSettings;

    const { data, isLoading } = useQuery(cardsQuery({ skipActions, token }));

    return (
        <Layout title='Cards'>
            <TrackAction />
            <PageViewAction page='cards' />
            {isLoading ? <Loader /> : <CardsMain data={data} />}
        </Layout>
    );
}
