import Menu from '@/app/krystel/components/menu';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import ClientOnly from '@/modules/core/components/common/client-only';
import Fingerprint from './fingerprint';

export function generateMetadata() {
    return {
        title: 'Krystel - Test',
    };
}

export default function Test() {
    return (
        <ClientOnly>
            <Menu />
            <TrackAction />
            <PageViewAction page='test' />
            <Fingerprint />
        </ClientOnly>
    );
}
