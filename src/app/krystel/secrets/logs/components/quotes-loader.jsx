'use client';
import { useState } from 'react';

import useSettings from '@/modules/core/hooks/use-settings';

import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';
import LogsTable from './logs-table';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function QuotesLoader() {
    const [key, setKey] = useState(0);
    const [logsRealtime] = useSettings('settings:logs:realtime', false);

    return (
        <DataLoader
            key={key}
            tags={['quotes']}
            url={`${BASE_URL}/krystel/actions`}
            loader={<Loader />}
            realtime={logsRealtime}
        >
            {data => <LogsTable data={data} onReload={setKey} />}
        </DataLoader>
    );
}
