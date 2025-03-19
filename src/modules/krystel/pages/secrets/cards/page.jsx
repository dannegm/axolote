import SecretsLayout from '@/modules/krystel/components/layout/secrets-layout';
import CardsLoader from './components/cards-loader';

export default function Page() {
    return (
        <SecretsLayout title='Cards'>
            <CardsLoader />
        </SecretsLayout>
    );
}
