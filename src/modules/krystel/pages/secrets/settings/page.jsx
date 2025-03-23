import SecretsLayout from '@/modules/krystel/components/layout/secrets-layout';
import Settings from './components/settings';

export default function Page() {
    return (
        <SecretsLayout title='Settings'>
            <div className='pt-4 pb-16'>
                <Settings />
            </div>
        </SecretsLayout>
    );
}
