'use client';

import { Share } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from './button';

export default function ShareButton({ title, text, url }) {
    const [canShare, setCanShare] = useState(false);

    const handleShare = async ev => {
        ev.preventDefault();
        if (!canShare) return;
        await navigator.share({ title, text, url });
    };

    useEffect(() => {
        setCanShare(!!navigator?.share);
    }, [navigator]);

    if (!canShare) {
        return null;
    }

    return (
        <Button onClick={handleShare}>
            <Share size={20} />
        </Button>
    );
}
