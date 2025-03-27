import { useState } from 'react';
import { cn } from '@/modules/core/helpers/utils';
import { Tabs, TabsList, TabsTrigger } from '@/modules/shadcn/ui/tabs';
import GiftCard from '@/modules/krystel/components/common/gift-card';
import ResponsiveBox from '@/modules/core/components/common/responsive-box';
import { extractConfigsAndContent } from '@/modules/krystel/helpers/strings';

const loremIpsum = '████   ████   ██\n███████   ██████\n████   ██████';

const rich = (text = '') => {
    const { configsRaw, content } = extractConfigsAndContent(text);
    return {
        hasContent: content.trim() !== '',
        composedContent: configsRaw + content,
        configsRaw,
    };
};

export default function CardEditorPreview({ className, showCardViewport, editorKey, content }) {
    const [mode, setMode] = useState('mobile');
    const richContent = rich(content);

    return (
        <div
            className={cn(
                'relative z-50 flex flex-col gap-2 pb-52 max-w-[384px] min-w-[358px] w-auto mx-auto',
                className,
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
                                    'absolute z-100 top-2 left-1/2 transform -translate-x-1/2 flex gap-1 bg-black text-white px-3 py-1 rounded-full shadow-lg text-xs font-bold',
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
                                        !richContent.hasContent,
                                }),
                                bg: '-z-10',
                            }}
                            quote={
                                richContent.hasContent
                                    ? richContent.composedContent
                                    : richContent.configsRaw + loremIpsum
                            }
                        />
                    </div>
                )}
            </ResponsiveBox>
        </div>
    );
}
