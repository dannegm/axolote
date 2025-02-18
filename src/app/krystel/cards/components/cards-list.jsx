import { useQueryState, parseAsBoolean } from 'nuqs';
import ClientOnly from '@/modules/core/components/common/client-only';
import CardItem from './card-item';

export default function CardsList({ data = [] }) {
    const [uwu] = useQueryState('uwu', parseAsBoolean.withDefault(false));

    return (
        <ClientOnly>
            <main className='px-4 md:p-0 w-full md:w-3/4 lg:w-4/6 xl:w-1/2 mx-auto border-t-8 border-gray-300'>
                <div className='flex flex-col gap-2 text-center my-6'>
                    {!uwu ? (
                        <h1 className='font-pacifico text-3xl text-center text-indigo-950'>
                            Krystel,
                        </h1>
                    ) : (
                        <figure className='flex-center -mt-4 text-center'>
                            <img className='h-24' src='/krystel-uwu.png' alt='Krystel' />
                        </figure>
                    )}
                    <p className='text-center text-sm text-slate-500 mx-8'>
                        Aquí podrás encontrar todas las tarjetitas que he creado.
                    </p>
                </div>

                <div className='grid grid-flow-row pb-16'>
                    {data.map(item => (
                        <CardItem key={`card-item-${item.id}`} item={item} />
                    ))}
                </div>
            </main>
        </ClientOnly>
    );
}
