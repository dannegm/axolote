'use client';
import { memo, useMemo } from 'react';
import VirtualList from '@/modules/core/components/common/virtual-list';

import CardItem from './card-item';

const MemoCardItem = memo(CardItem);

export default function CardsList({ data = [] }) {
    if (!data || !data?.length) return null;
    const memoData = useMemo(() => data, [data]);

    return <VirtualList data={memoData}>{item => <MemoCardItem item={item} />}</VirtualList>;
}
