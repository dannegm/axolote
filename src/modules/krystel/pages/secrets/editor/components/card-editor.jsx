import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';

import { CircleDashed, Circle } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { mergeDateAndTime } from '@/modules/core/helpers/dates';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useClonePosition from '@/modules/core/hooks/use-clone-position';
import useDrafts from '@/modules/core/hooks/use-drafts';

import ResponsiveBox from '@/modules/core/components/common/responsive-box';

import useCreateQuoteAction from '@/modules/krystel/hooks/use-create-quote-action';

import { Button } from '@/modules/shadcn/ui/button';

import CardEditorPreview from './card-editor-preview';
import CardEditorPanel from './card-editor-panel';
import CardEditorDrafts from './card-editor-drafts';
import { buildConfigs } from '@/modules/krystel/helpers/strings';

export default function CardEditor() {
    // Hooks
    const [, navigate] = useLocation();
    const { saveDraft } = useDrafts('editor:drafts');

    // Refs
    const $content = useRef();
    const $configs = useRef();
    const [$translucedButton, translucedButtonPosition] = useClonePosition();

    // Managers
    const [editorKey, setEditorKey] = useState(0);
    const [draftsOpen, setDraftsOpen] = useState(false);
    const [transluced, setTransluced] = useState(false);

    // Settings
    const [showCardViewport, setShowCardViewport] = useLocalStorage(
        'editor:show_card_viewport',
        false,
    );
    const [autoScroll, setAutoScroll] = useLocalStorage('editor:auto_scroll', false);

    // Content
    const [content, setContent] = useLocalStorage('editor:content', '');
    const [configs, setConfigs] = useLocalStorage('editor:configs', {});

    const composedContent = buildConfigs(configs) + content;
    const canReset = composedContent !== '';
    const canSave = content !== '';

    const [includesPushidedDate, setIncludesPushidedDate] = useState(false);
    const [publishedDate, setPublishedDate] = useState(new Date());
    const [publishedTime, setPublishedTime] = useState(new Date());

    // Logic
    const createQuote = useCreateQuoteAction({
        onSuccess: () => {
            handleReset();
            navigate('/krys/secrets/cards');
        },
    });

    const prepare = content => {
        return content;
    };

    // Handlers
    const handleReset = () => {
        setContent('');
        setConfigs({});
        setIncludesPushidedDate(false);
        setPublishedDate(new Date());
        setPublishedTime(new Date());
        $configs?.current?.reload?.({});
    };

    const handleSubmit = () => {
        if (!canSave) return;
        const preparedContent = prepare(composedContent);
        const publishedAt = includesPushidedDate
            ? mergeDateAndTime(publishedDate, publishedTime)
            : new Date();

        createQuote.mutate({
            // ...
            quote: preparedContent,
            published_at: publishedAt,
        });
    };

    const handleSaveDraft = () => {
        saveDraft(composedContent);
        handleReset();
    };

    const handleForceUpdate = () => {
        setEditorKey(prevKey => prevKey + 1);
    };

    // Other Hooks
    useEffect(() => {
        if (autoScroll) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }, [content]);

    return (
        <>
            <div
                data-layer='bg'
                data-variant='card'
                id='card-bg-portal'
                className='background fixed inset-0 z-10 transition-all duration-300'
            />
            <div
                data-layer='bg'
                data-variant='custom'
                id='custom-bg-portal'
                className='background fixed inset-0 z-20 transition-all duration-300'
            />
            <div
                data-layer='bg'
                data-variant='global'
                id='global-bg-portal'
                className='fixed inset-0 z-30 transition-all duration-300'
            />

            <CardEditorDrafts
                $configs={$configs}
                open={draftsOpen}
                setOpen={setDraftsOpen}
                setConfigs={setConfigs}
                setContent={setContent}
            />

            <ResponsiveBox defaultBreakpointName='mobile' breakpoints={{ desktop: 720 }}>
                <div className={cn('mt-4', 'lg:flex lg:flex-row lg:gap-4')}>
                    {$translucedButton?.current && (
                        <Button
                            className={cn(
                                'animate-in fade-in-0 duration-75 ease-in',
                                'absolute z-90 opacity-100 lg:hidden',
                            )}
                            style={{ ...translucedButtonPosition }}
                            type='button'
                            size='icon'
                            onClick={() => setTransluced(!transluced)}
                        >
                            {transluced ? <Circle /> : <CircleDashed />}
                        </Button>
                    )}

                    <CardEditorPanel
                        $content={$content}
                        $configs={$configs}
                        $translucedButton={$translucedButton}
                        transluced={transluced}
                        isPending={createQuote.isPending}
                        canSave={canSave}
                        canReset={canReset}
                        content={content}
                        setContent={setContent}
                        configs={configs}
                        setConfigs={setConfigs}
                        includesPushidedDate={includesPushidedDate}
                        setIncludesPushidedDate={setIncludesPushidedDate}
                        publishedDate={publishedDate}
                        setPublishedDate={setPublishedDate}
                        publishedTime={publishedTime}
                        setPublishedTime={setPublishedTime}
                        showCardViewport={showCardViewport}
                        setShowCardViewport={setShowCardViewport}
                        autoScroll={autoScroll}
                        setAutoScroll={setAutoScroll}
                        setDraftsOpen={setDraftsOpen}
                        onForceUpdate={handleForceUpdate}
                        onReset={handleReset}
                        onSubmit={handleSubmit}
                        onDraft={handleSaveDraft}
                    />

                    <CardEditorPreview
                        showCardViewport={showCardViewport}
                        editorKey={editorKey}
                        content={composedContent}
                    />
                </div>
            </ResponsiveBox>
        </>
    );
}
