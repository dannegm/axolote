'use client';

import useSettings from '@/modules/core/hooks/use-settings';
import ClientOnly from '@/modules/core/components/common/client-only';
import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';
import CardsMain from './cards-main';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function CardsLoader() {
    const [includesFuture] = useSettings('settings:cards:includes_future', false);
    const [includesDeleted] = useSettings('settings:cards:includes_deleted', false);

    const includes = [];
    if (includesFuture) includes.push('future');
    if (includesDeleted) includes.push('deleted');

    return (
        <ClientOnly>
            <DataLoader
                tags={['cards']}
                url={`${BASE_URL}/krystel?includes=${includes.join(',')}`}
                loader={<Loader />}
            >
                {data => <CardsMain data={data} />}
            </DataLoader>
        </ClientOnly>
    );
}
