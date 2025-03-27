import Layout from '@/modules/krystel/components/layout/layout';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import LoginForm from './login-form';

export default function Page() {
    return (
        <Layout title='Login'>
            <TrackAction />
            <PageViewAction page='login' />
            <LoginForm />
        </Layout>
    );
}
