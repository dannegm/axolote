import { useQuery } from '@tanstack/react-query';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useSettings from '@/modules/core/hooks/use-settings';

import Layout from '@/modules/krystel/components/layout/layout';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import Loader from '@/modules/core/components/common/loader';
import PostsMain from './components/posts-main';
import { postsQuery } from '@/modules/krystel/queries/krystel-queries';

export default function Page() {
    const [token] = useLocalStorage('app:tracker', null);
    const [includesIndev] = useSettings('settings:posts:includes_indev', false);
    const [includesDeleted] = useSettings('settings:posts:includes_deleted', false);

    const includes = [];
    if (includesIndev) includes.push('indev');
    if (includesDeleted) includes.push('deleted');

    const { data, isLoading } = useQuery(postsQuery({ includes, token }));

    return (
        <Layout title='Posts'>
            <TrackAction />
            <PageViewAction page='posts' />
            {isLoading ? <Loader /> : <PostsMain data={data} />}
        </Layout>
    );
}
