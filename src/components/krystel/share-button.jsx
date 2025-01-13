'use client';

import { Share } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useQuote } from '@/providers/quote-provider';
import usePostAction from '@/hooks/use-post-action';

import Button from '../common/button';

export default function ShareButton({ url, title = '', text = '' }) {
    const [canShare, setCanShare] = useState(false);

    const quote = useQuote();
    const postShare = usePostAction({ action: 'share', settings: quote.settings });

    const handleShare = async ev => {
        ev.preventDefault();
        if (!canShare) return;
        await navigator.share({ title, text, url });
        postShare();
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
