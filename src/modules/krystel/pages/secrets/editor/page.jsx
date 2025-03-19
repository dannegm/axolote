import SecretsLayout from '@/modules/krystel/components/layout/secrets-layout';
import CardEditor from './components/card-editor';

export default function Page() {
    return (
        <SecretsLayout title='Editor'>
            <CardEditor />
        </SecretsLayout>
    );
}
