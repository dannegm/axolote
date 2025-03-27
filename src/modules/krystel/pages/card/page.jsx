import Layout from '@/modules/krystel/components/layout/layout';
import TrackAction from '../../components/common/track-action';
import PageViewAction from '../../components/common/page-view-action';

export default function Page() {
    return (
        <Layout title='Test'>
            <TrackAction />
            <PageViewAction page='main' />
            <h1>Tú no eres Krys.</h1>
        </Layout>
    );
}
