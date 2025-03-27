import useSettings from '@/modules/core/hooks/use-settings';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import { buildQueryParams } from '@/modules/core/helpers/utils';

import DataLoader from '@/modules/core/components/common/data-loader';
import Loader from '@/modules/core/components/common/loader';

import PostsMain from './posts-main';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function PostsLoader() {
    const [token] = useLocalStorage('app:tracker', null);
    const [includesIndev] = useSettings('settings:posts:includes_indev', false);
    const [includesDeleted] = useSettings('settings:posts:includes_deleted', false);

    const includes = [];
    if (includesIndev) includes.push('indev');
    if (includesDeleted) includes.push('deleted');

    const queryParams = buildQueryParams({
        includes,
    });

    return (
        <DataLoader
            tags={['posts']}
            url={`${BASE_URL}/krystel/posts${queryParams}`}
            headers={{ 'x-dnn-tracker': token }}
            loader={<Loader />}
        >
            {data => <PostsMain data={data} />}
        </DataLoader>
    );
}
