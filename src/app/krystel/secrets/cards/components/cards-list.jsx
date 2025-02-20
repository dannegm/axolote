import ClientOnly from '@/modules/core/components/common/client-only';
import CardItem from './card-item';

export default function CardsList({ data = [] }) {
    return (
        <ClientOnly>
            <div className='grid grid-flow-row pb-16'>
                {data?.map(item => (
                    <CardItem key={`card-item-${item.id}`} item={item} />
                ))}
            </div>
        </ClientOnly>
    );
}
