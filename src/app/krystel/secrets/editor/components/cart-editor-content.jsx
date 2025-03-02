'use client';

import { cn } from '@/modules/core/helpers/utils';
import { Textarea } from '@/modules/shadcn/ui/textarea';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

export default function CardEditorContent({ ref, className, content, setContent }) {
    const $text = useRef();
    const [copied, setCopy] = useState(false);
    const [pasted, setPasted] = useState(false);

    const selectAnimation = () => {
        $text.current?.select?.();
        setTimeout(() => {
            setCopy(false);
            setPasted(false);
            $text.current?.blur?.();
        }, 100);
    };

    useImperativeHandle(ref, () => ({
        onCopy: () => {
            setCopy(true);
            selectAnimation();
        },
        onPaste: () => {
            setTimeout(() => {
                setPasted(true);
                selectAnimation();
            }, 50);
        },
    }));

    return (
        <div ref={ref} className={cn(className)}>
            <Textarea
                ref={$text}
                className={cn('bg-white placeholder:text-gray-300 selection:bg-purple-200', {
                    'selection:bg-cyan-300': copied,
                    'selection:bg-emerald-300': pasted,
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
