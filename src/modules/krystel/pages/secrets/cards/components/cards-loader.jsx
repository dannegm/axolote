import useSettings from '@/modules/core/hooks/use-settings';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';
import CardsMain from './cards-main';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function CardsLoader() {
    const [token] = useLocalStorage('app:tracker', null);
    const [includesFuture] = useSettings('settings:cards:includes_future', false);
    const [includesDeleted] = useSettings('settings:cards:includes_deleted', false);

    const includes = [];
    if (includesFuture) includes.push('future');
    if (includesDeleted) includes.push('deleted');

    return (
        <DataLoader
            tags={['cards']}
            url={`${BASE_URL}/krystel?includes=${includes.join(',')}`}
            headers={{ 'x-dnn-tracker': token }}
            loader={<Loader />}
        >
            {data => <CardsMain data={data} />}
        </DataLoader>
    );
}
