import Layout from '@/modules/krystel/components/layout/layout';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import CardsLoader from './components/cards-loader';

export default function Page() {
    return (
        <Layout title='Cards'>
            <TrackAction />
            <PageViewAction page='cards' />
            <CardsLoader />
        </Layout>
    );
}
