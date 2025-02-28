'use client';
import useSettings from '@/modules/core/hooks/use-settings';

import PostsCommingSoon from './posts-comming-soon';
import PostsLoader from './posts-loader';

export default function PostsMiddleware() {
    return <PostsLoader />;
}
