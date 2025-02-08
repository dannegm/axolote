import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import Menu from '../components/menu';
import CardsLoader from './componentes/cards-loader';
import TrackAction from '@/modules/krystel/components/common/track-action';

export function generateMetadata() {
    return {
        title: 'Krystel - Cards',
    };
}

export default function Cards() {
    return (
        <>
            <Menu />
            <TrackAction />
            <PageViewAction page='cards' />

            <main className='px-4 md:p-0 w-full md:w-3/4 lg:w-4/6 xl:w-1/2 mx-auto border-t-8 border-gray-300'>
                <div className='flex flex-col gap-2 text-center my-6'>
                    <h1 className='font-pacifico text-3xl text-center text-indigo-950'>Krystel,</h1>
                    <p className='text-center text-sm text-slate-500 mx-8'>
                        Aquí podrás encontrar todas las tarjetitas que he creado.
                    </p>
                </div>
                <CardsLoader />
            </main>
        </>
    );
}
