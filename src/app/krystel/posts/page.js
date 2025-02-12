import Menu from '@/app/krystel/components/menu';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';

export function generateMetadata() {
    return {
        title: 'Krystel - Posts',
    };
}

export default function Posts() {
    return (
        <>
            <Menu />
            <TrackAction />
            <PageViewAction page='posts' />

            <main className='w-full h-screen flex items-center justify-center'>
                <h1 className='font-pacifico text-2xl -mt-32'>Próximamente</h1>
            </main>
        </>
    );
}
