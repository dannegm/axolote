import { useEffect } from 'react';

export default function ExternalRedirect({ to, replace = false }) {
    useEffect(() => {
        if (replace) {
            window.location.replace(to);
        } else {
            window.location.href = to;
        }
    }, [to, replace]);

    return null;
}
