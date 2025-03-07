'use client';

import useSettings from '@/modules/core/hooks/use-settings';

import ClientOnly from '@/modules/core/components/common/client-only';
import DataLoader from '@/modules/core/components/common/data-loader';
import ToastHost from '@/modules/core/components/common/toast-host';
import Loader from '@/modules/core/components/common/loader';
import PostsMain from './posts-main';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function PostsLoader() {
    const [includesIndev] = useSettings('settings:posts:includes_indev', false);
    const [includesDeleted] = useSettings('settings:posts:includes_deleted', false);

    const includes = [];
    if (includesIndev) includes.push('indev');
    if (includesDeleted) includes.push('deleted');

    return (
        <ClientOnly>
            <ToastHost />
            <DataLoader
                tags={['posts']}
                url={`${BASE_URL}/krystel/posts?includes=${includes.join(',')}`}
                loader={<Loader />}
            >
                {data => <PostsMain data={data} />}
            </DataLoader>
        </ClientOnly>
    );
}
