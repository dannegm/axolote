'use client';
import { useState } from 'react';

import { cn } from '@/modules/core/helpers/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shadcn/ui/tabs';

import CardEditorContent from './cart-editor-content';
import CardEditorAdvanced from './card-editor-advanced';
import CardEditorActions from './card-editor-actions';
import CardEditorConfigs from './card-editor-configs';

export default function CardEditorPanel({
    className,
    $content,
    $configs,
    $translucedButton,
    transluced,
    isPending,
    canSave,
    canReset,
    content,
    setContent,
    configs,
    setConfigs,
    includesPushidedDate,
    setIncludesPushidedDate,
    publishedDate,
    setPublishedDate,
    publishedTime,
    setPublishedTime,
    showCardViewport,
    setShowCardViewport,
    pasteReplace,
    setPasteReplace,
    autoScroll,
    setAutoScroll,
    setDraftsOpen,
    onForceUpdate,
    onReset,
    onSubmit,
    onDraft,
}) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div
            className={cn(
                'flex-1 border-gray-300 bg-gray-100 transition-all duration-150',
                'fixed z-50 left-0 bottom-0 w-full border-t shadow-[0px_-2px_24px_4px_rgba(0,_0,_0,_0.1)]',
                'lg:sticky lg:top-20 lg:left-auto lg:bottom-auto lg:h-auto lg:max-h-fit lg:border lg:rounded-md lg:shadow-none',
                { 'opacity-30 blur-[2px] pointer-events-none': transluced },
                className,
            )}
        >
            <div
                className={cn(
                    'flex flex-col gap-2 p-4 pt-2 pb-16',
                    'md:w-3/4 md:mx-auto',
                    'lg:w-full lg:p-4 lg:gap-4',
                )}
            >
                <div
                    className={cn(
                        'flex flex-col gap-1 h-auto interpolate-size transition-all duration-150',
                        {
                            'h-0 overflow-hidden': !expanded,
                        },
                    )}
                >
                    <Tabs defaultValue='configs'>
                        <TabsList className='grid w-full grid-cols-3'>
                            <TabsTrigger value='content'>Content</TabsTrigger>
                            <TabsTrigger value='configs'>Configs</TabsTrigger>
                            <TabsTrigger value='advanced'>Advanced</TabsTrigger>
                        </TabsList>
                        <TabsContent value='content'>
                            <CardEditorContent
                                ref={$content}
                                content={content}
                                setContent={setContent}
                                setDraftsOpen={setDraftsOpen}
                            />
                        </TabsContent>

                        <TabsContent value='configs'>
                            <CardEditorConfigs
                                ref={$configs}
                                configs={configs}
                                setConfigs={setConfigs}
                            />
                        </TabsContent>

                        <TabsContent value='advanced'>
                            <CardEditorAdvanced
                                includesPushidedDate={includesPushidedDate}
                                setIncludesPushidedDate={setIncludesPushidedDate}
                                publishedDate={publishedDate}
                                setPublishedDate={setPublishedDate}
                                publishedTime={publishedTime}
                                setPublishedTime={setPublishedTime}
                                showCardViewport={showCardViewport}
                                setShowCardViewport={setShowCardViewport}
                                pasteReplace={pasteReplace}
                                setPasteReplace={setPasteReplace}
                                autoScroll={autoScroll}
                                setAutoScroll={setAutoScroll}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                <CardEditorActions
                    $translucedButton={$translucedButton}
                    isPending={isPending}
                    canSave={canSave}
                    canReset={canReset}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    onForceUpdate={onForceUpdate}
                    onReset={onReset}
                    onSubmit={onSubmit}
                    onDraft={onDraft}
                />
            </div>
        </div>
    );
}
