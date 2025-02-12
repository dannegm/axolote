'use client';

import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';
import LogsTable from './logs-table';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function QuotesLoader() {
    return (
        <DataLoader tags={['quotes']} url={`${BASE_URL}/krystel/actions`} loader={<Loader />}>
            {data => <LogsTable data={data} />}
        </DataLoader>
    );
}
