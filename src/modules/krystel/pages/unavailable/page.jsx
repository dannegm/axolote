import { differenceInYears } from 'date-fns';

import Layout from '@/modules/krystel/components/layout/layout';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';

export default function Page() {
    const kyrsBirthday = new Date('1998-12-31');
    const krysAge = differenceInYears(new Date(), kyrsBirthday);

    return (
        <Layout hideMenu>
            <TrackAction />
            <PageViewAction page='unavailable' />

            <div className='w-full h-screen bg-gray-950 text-white flex-center flex-col'>
                <h1 className='font-pacifico text-2xl text-center'>Krystel</h1>
                <p>Feliz cumple {krysAge}.</p>
            </div>
        </Layout>
    );
}
