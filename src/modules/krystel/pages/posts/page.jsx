import Layout from '@/modules/krystel/components/layout/layout';
import AuthProvider from '@/modules/krystel/providers/auth-provider';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import PostsLoader from './components/posts-loader';

export default function Page() {
    return (
        <Layout title='Posts'>
            <AuthProvider>
                <TrackAction />
                <PageViewAction page='posts' />
                <PostsLoader />
            </AuthProvider>
        </Layout>
    );
}
