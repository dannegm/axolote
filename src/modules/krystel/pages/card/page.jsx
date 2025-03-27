import Layout from '@/modules/krystel/components/layout/layout';
import TrackAction from '../../components/common/track-action';
import PageViewAction from '../../components/common/page-view-action';

export default function Page() {
    return (
        <Layout>
            <TrackAction />
            <PageViewAction page='main' />
            <main className='w-full h-screen flex-center flex-col gap-2'>
                <h1 className='font-pacifico text-2xl -mt-32 text-center'>Krystel</h1>
            </main>
        </Layout>
    );
}
