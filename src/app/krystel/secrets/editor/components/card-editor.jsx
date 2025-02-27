'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Save, Loader2, CircleDashed, Circle, ChevronDown, X, RefreshCcw } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import useClonePosition from '@/modules/core/hooks/use-clone-position';
import ClientOnly from '@/modules/core/components/common/client-only';

import { Button } from '@/modules/shadcn/ui/button';
import { Switch } from '@/modules/shadcn/ui/switch';
import { Textarea } from '@/modules/shadcn/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shadcn/ui/tabs';
import { DatePicker } from '@/modules/shadcn/ui/date-picker';
import { Separator } from '@/modules/shadcn/ui/separator';

import useCreateQuoteAction from '@/modules/krystel/hooks/use-create-quote-action';
import GiftCard from '@/modules/krystel/components/common/gift-card';
import { Label } from '@/modules/shadcn/ui/label';
import { TimePicker } from '@/modules/shadcn/ui/time-picker';
import { mergeDateAndTime } from '@/modules/core/helpers/dates';
import ResponsiveBox from '@/modules/core/components/common/responsive-box';

const loremIpsum = '████   ████   ██||███████   ██████||████   ██████';

const rich = (text = '') => text.replaceAll('\n', '||');

export default function CardEditor() {
    const router = useRouter();
    const [mode, setMode] = useState('mobile');
    const [editorKey, setEditorKey] = useState(0);

    const [showCardViewport, setShowCardViewport] = useState(false);

    const [content, setContent] = useLocalStorage('editor:content', '');

    const [includesPushidedDate, setIncludesPushidedDate] = useState(false);
    const [publishedDate, setPublishedDate] = useState(new Date());
    const [publishedTime, setPublishedTime] = useState(new Date());

    const [$translucedButton, translucedButtonPosition] = useClonePosition();
    const [transluced, setTransluced] = useState(false);
    const [expanded, setExpanded] = useState(true);

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

    const handleChange = ev => {
        setContent(ev.target.value);
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

    const forceUpdate = () => {
        setEditorKey(prevKey => prevKey + 1);
    };

    return (
        <ClientOnly>
            <div id='global-bg-portal' />
            <div id='card-bg-portal' />

            <div className={cn('mt-4', 'lg:flex lg:flex-row lg:gap-4')}>
                {$translucedButton?.current && (
                    <Button
                        className='absolute z-[51] opacity-100 lg:hidden fade-in-custom duration-150'
                        style={{ ...translucedButtonPosition }}
                        type='button'
                        size='icon'
                        onClick={() => setTransluced(!transluced)}
                    >
                        {transluced ? <Circle /> : <CircleDashed />}
                    </Button>
                )}

                <div
                    className={cn(
                        'flex-1 border-gray-300 bg-gray-100 transition-all duration-150',
                        'fixed z-50 left-0 bottom-0 w-full border-t shadow-[0px_-2px_24px_4px_rgba(0,_0,_0,_0.1)]',
                        'lg:relative lg:left-auto lg:bottom-auto lg:h-auto lg:max-h-fit lg:border lg:rounded-md lg:shadow-none',
                        { 'opacity-30 blur-[2px] pointer-events-none': transluced },
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
                            <Tabs defaultValue='content'>
                                <TabsList className='grid w-full grid-cols-2'>
                                    <TabsTrigger value='content'>Content</TabsTrigger>
                                    <TabsTrigger value='advanced'>Advanced</TabsTrigger>
                                </TabsList>
                                <TabsContent value='content'>
                                    <Textarea
                                        className='bg-white placeholder:text-gray-300'
                                        placeholder='Cuéntale a Krys lo mucho que la amas.'
                                        minRows={3}
                                        maxRows={8}
                                        value={content}
                                        onChange={handleChange}
                                    />
                                </TabsContent>
                                <TabsContent value='advanced'>
                                    <div className='flex flex-col gap-4 pb-4'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-row items-center justify-between'>
                                                <Label htmlFor='includes-pushided-date'>
                                                    Published date
                                                </Label>
                                                <Switch
                                                    id='includes-pushided-date'
                                                    checked={includesPushidedDate}
                                                    onCheckedChange={() =>
                                                        setIncludesPushidedDate(
                                                            !includesPushidedDate,
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div
                                                className={cn('flex flex-row gap-2', {
                                                    'opacity-60 pointer-events-none':
                                                        !includesPushidedDate,
                                                })}
                                            >
                                                <DatePicker
                                                    date={publishedDate}
                                                    onChange={setPublishedDate}
                                                />
                                                <TimePicker
                                                    value={publishedTime}
                                                    onChange={setPublishedTime}
                                                />
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className='flex flex-row justify-between items-center'>
                                            <Label htmlFor='show-card-viewport'>
                                                Show card viewport
                                            </Label>
                                            <Switch
                                                id='show-card-viewport'
                                                checked={showCardViewport}
                                                onCheckedChange={setShowCardViewport}
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className='flex flex-row gap-2'>
                            <div className='w-[36px] lg:hidden' ref={$translucedButton} />

                            <Button
                                className='lg:hidden'
                                type='button'
                                size='icon'
                                onClick={() => setExpanded(!expanded)}
                            >
                                <ChevronDown
                                    className={cn('transition-all duration-150', {
                                        'rotate-180': !expanded,
                                    })}
                                />
                            </Button>

                            <Button type='button' size='icon' onClick={forceUpdate}>
                                <RefreshCcw />
                            </Button>

                            <div className='flex-1' />

                            <Button
                                type='button'
                                size='icon'
                                variant='destructive'
                                onClick={handleReset}
                            >
                                <X
                                    className={cn('transition-all duration-150', {
                                        'rotate-180': !expanded,
                                    })}
                                />
                            </Button>

                            {createQuote.isPending ? (
                                <Button type='button' disabled>
                                    <Loader2 className='animate-spin' /> Guardando
                                </Button>
                            ) : (
                                <Button type='button' disabled={!canSave} onClick={handleSubmit}>
                                    <Save /> Guardar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        'relative flex flex-col gap-2 pb-52 max-w-[384px] min-w-[358px] w-auto mx-auto',
                    )}
                >
                    <Tabs
                        className='flex-1 hidden sm:block'
                        defaultValue='desktop'
                        value={mode}
                        onValueChange={setMode}
                    >
                        <TabsList className='grid w-full grid-cols-2'>
                            <TabsTrigger value='desktop'>Desktop</TabsTrigger>
                            <TabsTrigger value='mobile'>Mobile</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <ResponsiveBox
                        defaultBreakpointName='mobile'
                        breakpoints={{
                            desktop: 362,
                        }}
                    >
                        {({ breakpoint, size }) => (
                            <div className='relative'>
                                {showCardViewport && (
                                    <div
                                        className={cn(
                                            'absolute z-[500] top-2 left-1/2 transform -translate-x-1/2 flex gap-1 bg-black text-white px-3 py-1 rounded-full shadow-lg text-xs font-bold',
                                        )}
                                    >
                                        <span className='block'>{breakpoint}</span>
                                        <span className='block'>{`${size}px`}</span>
                                    </div>
                                )}

                                <GiftCard
                                    key={editorKey}
                                    className={cn({
                                        'min-w-[384px] w-auto': mode === 'desktop',
                                        'w-full sm:w-[360px] sm:mx-auto': mode === 'mobile',
                                    })}
                                    classNames={{
                                        text: cn({
                                            'text-gray-200 text-sm leading-6 whitespace-pre':
                                                !rich(content),
                                        }),
                                    }}
                                    quote={rich(content) || loremIpsum}
                                />
                            </div>
                        )}
                    </ResponsiveBox>
                </div>
            </div>
        </ClientOnly>
    );
}
