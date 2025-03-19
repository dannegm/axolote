import { useEffect } from 'react';

export default function useDocumentClassNames({ root = '', body = '' }) {
    useEffect(() => {
        root.split(' ').forEach(className => {
            document.documentElement.classList.add(className);
        });
        body.split(' ').forEach(className => {
            document.body.classList.add(className);
        });

        return () => {
            root.split(' ').forEach(className => {
                document.documentElement.classList.remove(className);
            });
            body.split(' ').forEach(className => {
                document.body.classList.remove(className);
            });
        };
    }, []);
}
