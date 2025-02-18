import Menu from '@/app/krystel/components/menu';
import PageViewAction from '@/modules/krystel/components/common/page-view-action';
import TrackAction from '@/modules/krystel/components/common/track-action';
import CardsLoader from './components/cards-loader';

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
            <CardsLoader />
        </>
    );
}
