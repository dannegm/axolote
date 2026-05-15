import { differenceInYears } from 'date-fns';
import { useNavigate } from '@tanstack/react-router';

import Layout from '@/modules/krystel/components/layout/layout';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';

export default function Page() {
    const navigate = useNavigate();
    const kyrsBirthday = new Date('1998-12-31');
    const krysAge = differenceInYears(new Date(), kyrsBirthday);

    return (
        <Layout hideMenu>
            <TrackAction />
            <PageViewAction page='unavailable' />

            <div className='w-full h-screen bg-gray-950 text-white flex-center flex-col gap-4'>
                <h1 className='font-pacifico text-2xl text-center'>Krystel</h1>
                <p>Feliz cumple {krysAge}.</p>

                <p className='text-sm text-gray-400 text-center px-6'>
                    Si estás buscando las tarjetitas de siempre sólo pica el botón de abajo. Por
                    cierto, ya no necesita autentición.
                </p>

                <button
                    onClick={() => navigate({ to: '/krys' })}
                    className='px-6 py-2 bg-white text-gray-950 font-semibold rounded-full hover:bg-gray-200 transition-colors'
                >
                    llévame a ellas
                </button>
            </div>
        </Layout>
    );
}
