'use client';

import { Share } from 'lucide-react';
import { useEffect, useState } from 'react';

const ShareButton = ({ title, text, url }) => {
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
        <button
            type='button'
            className='flex flex-row justify-center items-center px-6 py-3 rounded-full shadow-md font-delius bg-white text-gray-800 hover:shadow-lg hover:bg-gray-50 active:shadow-sm transition-all duration-200 hover:scale-110 active:scale-100'
            onClick={handleShare}
        >
            <Share size={20} />
        </button>
    );
};

export default ShareButton;
