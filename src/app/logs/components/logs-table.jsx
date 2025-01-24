import LogItem from './log-item';

export default function LogsTable({ data = [] }) {
    return (
        <div className='grid grid-flow-row gap-2 px-4 md:p-0 w-full md:w-10/12 lg:w-5/6 xl:w-4/6 mx-auto border-t-8 border-gray-300'>
            {data.map(item => (
                <LogItem key={`log-item-${item.id}`} item={item} />
            ))}
        </div>
    );
}
