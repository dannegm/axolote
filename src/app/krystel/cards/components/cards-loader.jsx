'use client';

import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';
import CardsList from './cards-list';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function CardsLoader() {
    return (
        <DataLoader tags={['cards']} url={`${BASE_URL}/krystel`} loader={<Loader />}>
            {data => <CardsList data={data} />}
        </DataLoader>
    );
}
