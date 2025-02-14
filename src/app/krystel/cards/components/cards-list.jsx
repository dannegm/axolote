import CardItem from './card-item';

export default function CardsList({ data = [] }) {
    return (
        <div className='grid grid-flow-row pb-16'>
            {data.map(item => (
                <CardItem key={`card-item-${item.id}`} item={item} />
            ))}
        </div>
    );
}
