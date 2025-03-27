import Layout from '@/modules/krystel/components/layout/layout';
import AuthProvider from '@/modules/krystel/providers/auth-provider';
import QuoteLoader from './components/quote-loader';

export default function Page() {
    return (
        <Layout>
            <AuthProvider>
                <QuoteLoader />
            </AuthProvider>
        </Layout>
    );
}
