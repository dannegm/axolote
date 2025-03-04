'use client';

import { useRef, useState } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';

import { Clipboard, Copy, ClipboardPlus } from 'lucide-react';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';

import { useResponsiveBox } from '@/modules/core/components/common/responsive-box';
import { cn } from '@/modules/core/helpers/utils';
import { Textarea } from '@/modules/shadcn/ui/textarea';

import { Toolbar, ToolbarButton, ToolbarAction, ToolbarSpacer } from '@/modules/shadcn/ui/toolbar';

export default function CardEditorContent({ ref, className, content, setContent, setDraftsOpen }) {
    const $text = useRef();
    const [, copyToClipboard] = useCopyToClipboard();

    const [pasteReplace] = useLocalStorage('editor:paste_replace', true);

    const [copied, setCopy] = useState(false);
    const [pasted, setPasted] = useState(false);

    const { breakpoint } = useResponsiveBox();

    const selectAnimation = () => {
        setTimeout(() => {
            setCopy(false);
            setPasted(false);
        }, 200);
    };

    const handlePaste = async () => {
        const clipboardText = await navigator.clipboard.readText();
        if (pasteReplace) {
            setContent(clipboardText);
        } else {
            setContent(text => text + clipboardText);
        }

        setPasted(true);
        selectAnimation();
    };

    const handleCopy = () => {
        copyToClipboard(content);
        setCopy(true);
        selectAnimation();
    };

    return (
        <div ref={ref} className={cn('flex flex-col gap-2', className)}>
            <Toolbar>
                <ToolbarAction onClick={handlePaste}>
                    {pasteReplace ? <Clipboard /> : <ClipboardPlus />}
                </ToolbarAction>

                <ToolbarAction onClick={handleCopy}>
                    <Copy />
                </ToolbarAction>

                <ToolbarSpacer />

                <ToolbarButton onClick={() => setDraftsOpen(true)}>Drafts</ToolbarButton>
            </Toolbar>

            <Textarea
                ref={$text}
                className={cn('bg-white placeholder:text-gray-300', {
                    'bg-cyan-200': copied,
                    'bg-emerald-200': pasted,
                })}
                placeholder='Cuéntale a Krys lo mucho que la amas.'
                minRows={3}
                maxRows={breakpoint === 'desktop' ? 20 : 8}
                value={content}
                onChange={ev => setContent(ev.target.value)}
            />
        </div>
    );
}
