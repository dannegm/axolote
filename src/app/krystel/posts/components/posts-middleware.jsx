'use client';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';

import PostsCommingSoon from './posts-comming-soon';
import PostsLoader from './posts-loader';

export default function PostsMiddleware() {
    const [enablePostsSection] = useLocalStorage('settings:posts:enable', false);
    return <>{enablePostsSection ? <PostsLoader /> : <PostsCommingSoon />}</>;
}
