'use client';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';

import ClientOnly from '@/modules/core/components/common/client-only';
import DataLoader from '@/modules/core/components/common/data-loader';
import ToastHost from '@/modules/core/components/common/toast-host';
import Loader from '@/modules/core/components/common/loader';
import PostsList from './posts-list';

const BASE_URL = 'https://endpoints.hckr.mx/quotes';

export default function PostsLoader() {
    const [includesDeleted] = useLocalStorage('settings:posts:includes_deleted', false);

    const includes = [];
    if (includesDeleted) includes.push('deleted');

    return (
        <ClientOnly>
            <ToastHost />
            <DataLoader
                tags={['posts']}
                url={`${BASE_URL}/krystel/posts?includes=${includes.join(',')}`}
                loader={<Loader />}
            >
                {data => <PostsList data={data} />}
            </DataLoader>
        </ClientOnly>
    );
}
