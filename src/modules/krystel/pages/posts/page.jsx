import Layout from '@/modules/krystel/components/layout/layout';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import PostsLoader from './components/posts-loader';

export default function Page() {
    return (
        <Layout title='Posts'>
            <TrackAction />
            <PageViewAction page='posts' />
            <PostsLoader />
        </Layout>
    );
}
