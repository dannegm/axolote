import ClientOnly from '@/modules/core/components/common/client-only';
import LogItem from './log-item';

export default function LogsTable({ data = [] }) {
    return (
        <ClientOnly>
            <div className='grid grid-flow-row pb-16'>
                {data.map(item => (
                    <LogItem key={`log-item-${item.id}`} item={item} />
                ))}
            </div>
        </ClientOnly>
    );
}
