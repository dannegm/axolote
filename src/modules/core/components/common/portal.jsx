'use client';

import { useEffect, useTransition, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ portalId, children }) {
    const [portalRoot, setPortalRoot] = useState(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            const root = document.getElementById(portalId);
            setPortalRoot(root || null);
        });
    }, [portalId, startTransition, setPortalRoot]);

    if (isPending || !portalRoot) return null;
    return createPortal(children, portalRoot);
}
