import Menu from '@/app/krystel/components/menu';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import PostsMiddleware from './components/posts-middleware';
import ClientOnly from '@/modules/core/components/common/client-only';

export function generateMetadata() {
    return {
        title: 'Krystel - Posts',
    };
}

export default function Posts() {
    return (
        <ClientOnly>
            <Menu />
            <TrackAction />
            <PageViewAction page='posts' />
            <PostsMiddleware />
        </ClientOnly>
    );
}
