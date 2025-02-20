'use client';
import { useEffect } from 'react';
import usePageViewAction from '@/modules/krystel/hooks/use-page-view-action';

export default function PageViewAction({ page }) {
    const sendPageView = usePageViewAction({ page });
    useEffect(() => {
        sendPageView();
    }, []);
    return <></>;
}
