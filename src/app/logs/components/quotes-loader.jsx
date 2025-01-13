'use client';

import DataLoader from '@/components/common/data-loader';
import LogsTable from './logs-table';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function QuotesLoader() {
    return (
        <DataLoader tags={['quotes']} url={`${BASE_URL}/krystel/actions`}>
            {data => <LogsTable data={data} />}
        </DataLoader>
    );
}
