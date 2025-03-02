'use client';

import { cn } from '@/modules/core/helpers/utils';
import { Textarea } from '@/modules/shadcn/ui/textarea';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

export default function CardEditorContent({ ref, className, content, setContent }) {
    const $text = useRef();
    const [copied, setCopy] = useState(false);
    const [pasted, setPasted] = useState(false);

    const selectAnimation = () => {
        setTimeout(() => {
            setCopy(false);
            setPasted(false);
        }, 200);
    };

    useImperativeHandle(ref, () => ({
        onCopy: () => {
            setCopy(true);
            selectAnimation();
        },
        onPaste: () => {
            setPasted(true);
            selectAnimation();
        },
    }));

    return (
        <div ref={ref} className={cn(className)}>
            <Textarea
                ref={$text}
                className={cn('bg-white placeholder:text-gray-300', {
                    'bg-cyan-200': copied,
                    'bg-emerald-200': pasted,
                })}
                placeholder='Cuéntale a Krys lo mucho que la amas.'
                minRows={3}
                maxRows={8}
                value={content}
                onChange={ev => setContent(ev.target.value)}
            />
        </div>
    );
}
