import Layout from '@/modules/krystel/components/layout/layout';
import AuthProvider from '@/modules/krystel/providers/auth-provider';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import Fingerprint from './fingerprint';

export default function Page() {
    return (
        <Layout title='Test'>
            <AuthProvider>
                <TrackAction />
                <PageViewAction page='test' />
                <Fingerprint />
            </AuthProvider>
        </Layout>
    );
}
