import { useEffect } from 'react';

export const useIframeDocumentTitle = $iframeRef => {
    useEffect(() => {
        const iframe = $iframeRef.current;
        if (!iframe) {
            return undefined;
        }

        const prev = document.title;

        const handleLoad = () => {
            const title = iframe.contentDocument?.title;
            if (title) {
                document.title = title;
            }
        };

        iframe.addEventListener('load', handleLoad);

        return () => {
            iframe.removeEventListener('load', handleLoad);
            document.title = prev;
        };
    }, [$iframeRef]);
};
