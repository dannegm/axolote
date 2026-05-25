import { useQuery } from '@tanstack/react-query';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useSettings from '@/modules/core/hooks/use-settings';

import SecretsLayout from '@/modules/krystel/components/layout/secrets-layout';
import Loader from '@/modules/core/components/common/loader';
import CardsMain from './components/cards-main';
import { secretCardsQuery } from '@/modules/krystel/queries/krystel-queries';

export default function Page() {
    const [token] = useLocalStorage('app:tracker', null);
    const [includesFuture] = useSettings('settings:cards:includes_future', false);
    const [includesDeleted] = useSettings('settings:cards:includes_deleted', false);

    const includes = [];
    if (includesFuture) includes.push('future');
    if (includesDeleted) includes.push('deleted');

    const { data, isLoading } = useQuery(secretCardsQuery({ includes, token }));

    return (
        <SecretsLayout title='Cards'>
            {isLoading ? <Loader /> : <CardsMain data={data} />}
        </SecretsLayout>
    );
}
