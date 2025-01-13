import LogItem from './log-item';

export default function LogsTable({ data = [] }) {
    return (
        <div className='grid grid-flow-row gap-2 p-4'>
            {data.map(item => (
                <LogItem key={`log-item-${item.id}`} item={item} />
            ))}
        </div>
    );
}
