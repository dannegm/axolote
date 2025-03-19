import SecretsLayout from '@/modules/krystel/components/layout/secrets-layout';
import LogsLoader from './components/logs-loader';

export default function Logs() {
    return (
        <SecretsLayout title='Logs'>
            <LogsLoader />
        </SecretsLayout>
    );
}
