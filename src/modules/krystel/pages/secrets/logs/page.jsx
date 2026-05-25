import { useQuery } from '@tanstack/react-query';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useSettings from '@/modules/core/hooks/use-settings';

import SecretsLayout from '@/modules/krystel/components/layout/secrets-layout';
import Loader from '@/modules/core/components/common/loader';
import LogsMain from './components/logs-main';
import { logsQuery } from '@/modules/krystel/queries/krystel-queries';

export default function Logs() {
    const [token] = useLocalStorage('app:tracker', null);
    const [logsRealtime] = useSettings('settings:logs:realtime', false);

    const { data, isLoading, refetch } = useQuery(
        logsQuery({
            token,
            refetchInterval: logsRealtime ? 1000 : false,
            refetchOnWindowFocus: logsRealtime,
            refetchOnReconnect: logsRealtime,
        }),
    );

    return (
        <SecretsLayout title='Logs'>
            {isLoading ? <Loader /> : <LogsMain data={data} onReload={refetch} />}
        </SecretsLayout>
    );
}
