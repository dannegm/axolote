'use client';

import { useRef, useState } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';

import { Clipboard, Copy, ClipboardPlus } from 'lucide-react';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import { useResponsiveBox } from '@/modules/core/components/common/responsive-box';
import { buildConfigs, extractConfigsAndContent } from '@/modules/krystel/helpers/strings';

import { cn } from '@/modules/core/helpers/utils';
import { Textarea } from '@/modules/shadcn/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/modules/shadcn/ui/tooltip';
import { Toolbar, ToolbarButton, ToolbarAction, ToolbarSpacer } from '@/modules/shadcn/ui/toolbar';

export default function CardEditorContent({
    ref,
    className,
    configs,
    content,
    setConfigs,
    setContent,
    setDraftsOpen,
}) {
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

    const handlePaste = text => {
        const { configs, content } = extractConfigsAndContent(text);
        const safeContent = content.replaceAll('||', '');

        if (pasteReplace) {
            setConfigs(configs);
            setContent(safeContent);
        } else {
            setContent(prev => prev + safeContent);
        }

        setPasted(true);
        selectAnimation();
    };

    const handleInputPaste = event => {
        if (pasteReplace) {
            event.preventDefault();
            const clipboardText = event.clipboardData.getData('text');
            handlePaste(clipboardText);
        }
    };

    const handleButtonPaste = async () => {
        const clipboardText = await navigator.clipboard.readText();
        handlePaste(clipboardText);
    };

    const handleCopy = () => {
        const configsEncoded = buildConfigs(configs);
        const composedContent = `${configsEncoded} ${content}`.trim();

        copyToClipboard(composedContent);
        setCopy(true);
        selectAnimation();
    };

    return (
        <div ref={ref} className={cn('flex flex-col gap-2', className)}>
            <Toolbar>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ToolbarAction onClick={handleButtonPaste}>
                                {pasteReplace ? <Clipboard /> : <ClipboardPlus />}
                            </ToolbarAction>
                        </TooltipTrigger>
                        <TooltipContent>
                            {pasteReplace ? <p>Paste and replace</p> : <p>Simple paste</p>}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ToolbarAction onClick={handleCopy}>
                                <Copy />
                            </ToolbarAction>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy with configs</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

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
                onPaste={handleInputPaste}
            />
        </div>
    );
}
