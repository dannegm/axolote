import { memo, useMemo } from 'react';

import VirtualList from '@/modules/core/components/common/virtual-list';
import PostItem from './post-item';

const MemoPostItem = memo(PostItem);

export default function PostsList({ data = [] }) {
    if (!data || !data?.length) return null;
    const memoData = useMemo(() => data, [data]);

    return <VirtualList data={memoData}>{item => <MemoPostItem item={item} />}</VirtualList>;
}
