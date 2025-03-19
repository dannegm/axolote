import { useEffect, useState } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';

import { cn } from '@/modules/core/helpers/utils';
import useTimeout from '@/modules/core/hooks/use-timeout';

const FEEDBACK_DURATION = 3000;

export default function CopyText({ content, children, onCopy }) {
    const [copied, setCopied] = useState(false);
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    const { start } = useTimeout(
        () => {
            setCopied(false);
        },
        FEEDBACK_DURATION,
        { autoRun: false },
    );

    const handleCopy = async ev => {
        ev.preventDefault();
        setCopied(true);
        start();
        copyToClipboard(content);
    };

    useEffect(() => {
        if (copiedText) {
            onCopy?.(copiedText);
        }
    }, [copiedText]);

    return (
        <div
            className={cn(
                'inline-block py-1 px-2 bg-red-500 text-red-100 text-xs font-bold rounded-md',
                'hover:bg-red-600',
                'active:bg-green-500 active:text-green-100 active:scale-110',
                'transition-all cursor-pointer',
                {
                    'bg-green-500 text-green-100 hover:bg-green-600': copied,
                },
            )}
            onClick={handleCopy}
        >
            {children}
        </div>
    );
}
