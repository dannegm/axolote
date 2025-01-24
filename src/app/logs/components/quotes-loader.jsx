'use client';

import DataLoader from '@/components/common/data-loader';
import LogsTable from './logs-table';
import Loader from '@/components/common/loader';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function QuotesLoader() {
    return (
        <DataLoader tags={['quotes']} url={`${BASE_URL}/krystel/actions`} loader={<Loader />}>
            {data => <LogsTable data={data} />}
        </DataLoader>
    );
}
