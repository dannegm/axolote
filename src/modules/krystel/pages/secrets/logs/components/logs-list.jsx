import { memo, useMemo } from 'react';
import LogItem from './log-item';

const MemoLogItem = memo(LogItem);

export default function LogsList({ data = [], logsRealtime }) {
    if (!data || !data?.length) return null;
    const memoData = useMemo(() => data, [data]);

    return (
        <>
            {memoData?.map(item => (
                <MemoLogItem key={`log-item-${item.id}`} item={item} realtime={logsRealtime} />
            ))}
        </>
    );
}
