'use client';
import useSettings from '@/modules/core/hooks/use-settings';

import PostsCommingSoon from './posts-comming-soon';
import PostsLoader from './posts-loader';

export default function PostsMiddleware() {
    const [enablePostsSection] = useSettings('settings:posts:enable', false);
    return <>{enablePostsSection ? <PostsLoader /> : <PostsCommingSoon />}</>;
}
