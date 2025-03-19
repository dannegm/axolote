import { useRef, useState } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';

import { Clipboard, Copy, ClipboardPen } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { useResponsiveBox } from '@/modules/core/components/common/responsive-box';
import { buildConfigs, extractConfigsAndContent } from '@/modules/krystel/helpers/strings';

import { Textarea } from '@/modules/shadcn/ui/textarea';
import { Toolbar, ToolbarButton, ToolbarAction, ToolbarSpacer } from '@/modules/shadcn/ui/toolbar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/modules/shadcn/ui/tooltip';

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

    const [copied, setCopy] = useState(false);
    const [pasted, setPasted] = useState(false);

    const { breakpoint } = useResponsiveBox();

    const selectAnimation = () => {
        setTimeout(() => {
            setCopy(false);
            setPasted(false);
        }, 200);
    };

    const handleButtonPasteReplace = async () => {
        const clipboardText = await navigator.clipboard.readText();
        const { configs, content } = extractConfigsAndContent(clipboardText);
        const safeContent = content;

        setConfigs(configs);
        setContent(safeContent);

        setPasted(true);
        selectAnimation();
    };

    const handleButtonPasteSimple = async () => {
        const clipboardText = await navigator.clipboard.readText();

        const textarea = $text.current;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = content.substring(0, start) + clipboardText + content.substring(end);

        setContent(newText);

        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + clipboardText.length;
        }, 0);
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
                            <ToolbarAction onClick={handleButtonPasteReplace}>
                                <ClipboardPen />
                            </ToolbarAction>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Paste and replace</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ToolbarAction onClick={handleButtonPasteSimple}>
                                <Clipboard />
                            </ToolbarAction>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Simple paste</p>
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
            />
        </div>
    );
}
