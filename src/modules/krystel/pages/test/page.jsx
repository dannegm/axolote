import Layout from '@/modules/krystel/components/layout/layout';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import Fingerprint from './fingerprint';

export default function Test() {
    return (
        <Layout title='Test'>
            <TrackAction />
            <PageViewAction page='test' />
        </Layout>
    );
}
