'use client';
import { memo, useMemo } from 'react';

import VirtualList from '@/modules/core/components/common/virtual-list';
import { Separator } from '@/modules/shadcn/ui/separator';
import CardItem from './card-item';

const MemoLogItem = memo(({ item }) => {
    return (
        <>
            <Separator />
            <CardItem item={item} />
        </>
    );
});

export default function CardsList({ data = [] }) {
    if (!data || !data?.length) return null;
    const memoData = useMemo(() => data, [data]);

    return <VirtualList data={memoData}>{item => <MemoLogItem item={item} />}</VirtualList>;
}
