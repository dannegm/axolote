import { useState } from 'react';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useSettings from '@/modules/core/hooks/use-settings';

import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';
import LogsMain from './logs-main';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function LogsLoader() {
    const [token] = useLocalStorage('app:tracker', null);
    const [key, setKey] = useState(0);
    const [logsRealtime] = useSettings('settings:logs:realtime', false);

    return (
        <DataLoader
            key={key}
            tags={['actions']}
            url={`${BASE_URL}/krystel/actions`}
            headers={{ 'x-dnn-tracker': token }}
            loader={<Loader />}
            realtime={logsRealtime}
        >
            {data => <LogsMain data={data} onReload={setKey} />}
        </DataLoader>
    );
}
