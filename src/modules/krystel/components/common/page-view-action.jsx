import { useEffect } from 'react';
import usePageViewAction from '@/modules/krystel/hooks/use-page-view-action';

export default function PageViewAction({ page }) {
    const { trigger } = usePageViewAction({ page });
    useEffect(() => {
        trigger();
    }, []);
    return <></>;
}
