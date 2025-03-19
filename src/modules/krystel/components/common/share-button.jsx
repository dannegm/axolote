import { Share } from 'lucide-react';
import { useEffect, useState } from 'react';

import usePostAction from '@/modules/krystel/hooks/use-post-action';

import Button from './button';

export default function ShareButton({ url, title = '', text = '', quote }) {
    const [canShare, setCanShare] = useState(false);
    const postShare = usePostAction({ action: 'share', settings: quote?.settings });

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
