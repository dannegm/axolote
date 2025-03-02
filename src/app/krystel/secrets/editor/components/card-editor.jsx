'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CircleDashed, Circle } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useClonePosition from '@/modules/core/hooks/use-clone-position';
import ClientOnly from '@/modules/core/components/common/client-only';

import { Button } from '@/modules/shadcn/ui/button';

import useCreateQuoteAction from '@/modules/krystel/hooks/use-create-quote-action';
import { mergeDateAndTime } from '@/modules/core/helpers/dates';
import CardEditorPreview from './card-editor-preview';
import CardEditorPanel from './card-editor-panel';

export default function CardEditor() {
    const router = useRouter();
    const [editorKey, setEditorKey] = useState(0);

    const [showCardViewport, setShowCardViewport] = useState(false);

    const [content, setContent] = useLocalStorage('editor:content', '');

    const [includesPushidedDate, setIncludesPushidedDate] = useState(false);
    const [publishedDate, setPublishedDate] = useState(new Date());
    const [publishedTime, setPublishedTime] = useState(new Date());

    const [$translucedButton, translucedButtonPosition] = useClonePosition();
    const [transluced, setTransluced] = useState(false);

    const canSave = content !== '';

    const createQuote = useCreateQuoteAction({
        onSuccess: () => {
            router.push('/krystel/secrets/cards');
            setContent('');
            setPublishedDate(new Date());
            setPublishedTime(new Date());
        },
    });

    const prepare = content => {
        return content.replaceAll('\n', '\n||').replaceAll('})\n||', '})\n');
    };

    const handleReset = () => {
        setContent('');
        setIncludesPushidedDate(false);
        setPublishedDate(new Date());
        setPublishedTime(new Date());
    };

    const handleSubmit = () => {
        if (!canSave) return;
        const preparedContent = prepare(content);
        const publishedAt = includesPushidedDate
            ? mergeDateAndTime(publishedDate, publishedTime)
            : new Date();

        createQuote.mutate({
            // ...
            quote: preparedContent,
            published_at: publishedAt,
        });
    };

    const handleForceUpdate = () => {
        setEditorKey(prevKey => prevKey + 1);
    };

    return (
        <ClientOnly>
            <div id='global-bg-portal' />
            <div id='card-bg-portal' />

            <div className={cn('mt-4', 'lg:flex lg:flex-row lg:gap-4')}>
                {$translucedButton?.current && (
                    <Button
                        className={cn(
                            'animate-in fade-in-0 duration-75 ease-in',
                            'absolute z-51 opacity-100 lg:hidden',
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
                    $translucedButton={$translucedButton}
                    transluced={transluced}
                    isPending={createQuote.isPending}
                    canSave={canSave}
                    content={content}
                    setContent={setContent}
                    includesPushidedDate={includesPushidedDate}
                    setIncludesPushidedDate={setIncludesPushidedDate}
                    publishedDate={publishedDate}
                    setPublishedDate={setPublishedDate}
                    publishedTime={publishedTime}
                    setPublishedTime={setPublishedTime}
                    showCardViewport={showCardViewport}
                    setShowCardViewport={setShowCardViewport}
                    onForceUpdate={handleForceUpdate}
                    onReset={handleReset}
                    onSubmit={handleSubmit}
                />

                <CardEditorPreview
                    showCardViewport={showCardViewport}
                    editorKey={editorKey}
                    content={content}
                />
            </div>
        </ClientOnly>
    );
}
