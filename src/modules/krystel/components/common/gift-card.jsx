'use client';
import { useEffect } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { formatDistanceToNow, isBefore } from 'date-fns';
import { es as locale } from 'date-fns/locale';
import { Asterisk, Clock3, icons } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import Portal from '@/modules/core/components/common/portal';

import { isElevenEleven, isThreeInTheMorning } from '@/modules/krystel/helpers/dates';
import {
    extractConfigsAndContent,
    replaceWithLongestSentence,
} from '@/modules/krystel/helpers/strings';

import QuoteProvider from '@/modules/krystel/providers/quote-provider';

import usePostAction from '@/modules/krystel/hooks/use-post-action';
import useFirstAppearance from '@/modules/krystel/hooks/use-first-appearance';
import useTrackAction from '@/modules/krystel/hooks/use-track-action';
import { useGreetings } from '@/modules/krystel/services/greetings';

import RichText from './rich-text';
import Card from './card';

export default function GiftCard({
    classNames = {},
    quote = '...',
    icon = 'Badge',
    border = '',
    scheme = 'bg-white text-gray-600',
    settings = 'none',
    published_at = undefined,
}) {
    const [uwu] = useQueryState('uwu', parseAsBoolean.withDefault(false));

    const [id] = settings.split(':');
    const firstAppearance = useFirstAppearance(id);

    useTrackAction();
    const postView = usePostAction({ action: 'view', settings });

    if (isElevenEleven()) {
        quote = '({icon:hidden})[[[pray]]]$$11:11$$ pide un deseo.';
    }

    if (isThreeInTheMorning()) {
        quote = '({icon:hidden})[[[[ufo]]]]';
    }

    const generatedGreetings = useGreetings();

    const { configs, content } = extractConfigsAndContent(quote);
    const isLongText = replaceWithLongestSentence(content).length > 120;
    const greetings = configs?.greetings || generatedGreetings;
    const letter = configs?.letter;
    const frame = configs?.frame;
    const dark = configs?.dark;
    const showDate = configs?.date !== 'hidden';
    const LucideIcon = configs?.icon !== 'hidden' ? icons[configs?.icon] || icons[icon] : <></>;

    const date = published_at ? new Date(published_at + 'Z') : new Date();
    const datePrefix = isBefore(date, new Date()) ? 'hace ' : 'dentro de ';

    useEffect(() => {
        if (settings !== 'none') {
            postView();
        }
    }, []);

    return (
        <QuoteProvider quote={{ settings }}>
            <Card
                border={configs?.border ? '' : border}
                scheme={scheme}
                letter={letter}
                frame={frame}
                classNames={{
                    border: cn({ 'bg-none': configs?.border }, configs?.border, classNames?.border),
                    content: cn(
                        configs?.scheme,
                        {
                            'text-white [text-shadow:_1px_1px_8px_rgb(0_0_0_/_30%)]': frame,
                            'text-black': dark,
                        },
                        classNames?.content,
                    ),
                    container: classNames?.container,
                }}
            >
                {configs?.bg && (
                    <Portal portalId='card-bg-portal'>
                        <div
                            className={cn(
                                'fixed fade-in-custom inset-0 pointer-events-none transition-all duration-150',
                                configs?.bg,
                            )}
                        />
                    </Portal>
                )}

                {!configs?.fullscreen && configs?.badge !== 'hidden' && firstAppearance && (
                    <div
                        className={cn(
                            'fade-in absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-pink-600 rounded-full',
                            { 'right-auto top-6 left-1/2 -ml-3 scale-75': letter },
                        )}
                    >
                        <Asterisk
                            className={cn('text-white h-[56px] w-[56px]', { 'h-6 w-6': letter })}
                        />
                    </div>
                )}

                <div
                    className={cn('flex flex-col items-center gap-8', {
                        'w-full flex-row gap-2 justify-between mb-8': letter,
                    })}
                >
                    {!configs?.fullscreen && configs?.name !== 'hidden' && !uwu && (
                        <p
                            className={cn('font-pacifico text-3xl text-center', {
                                'text-left text-xl': letter,
                            })}
                        >
                            Krystel,
                        </p>
                    )}

                    {!configs?.fullscreen && configs?.name !== 'hidden' && uwu && (
                        <img
                            className={cn('block h-24 -mb-8 md:-mb-4 -mt-10 md:-mt-12', {
                                'h-14 -mt-3 -ml-3': letter,
                            })}
                            src='/krystel-uwu.png'
                            alt='Krystel'
                        />
                    )}

                    {!configs?.fullscreen && configs?.icon !== 'hidden' && (
                        <div className={cn('block')}>
                            <LucideIcon
                                className={cn('text-current h-[56px] w-[56px]', {
                                    'h-6 w-6': letter,
                                    'drop-shadow-md': frame,
                                })}
                            />
                        </div>
                    )}
                </div>

                <div
                    className={cn(
                        'font-delius text-center text-xl font-medium leading-snug',
                        {
                            'text-md': isLongText,
                            'font-noto text-left text-[0.825rem] text-balance hyphens-auto leading-normal':
                                letter,
                        },
                        classNames?.text,
                    )}
                >
                    <RichText>{content}</RichText>
                </div>

                {!configs?.fullscreen && configs?.greetings !== 'hidden' && (
                    <p
                        className={cn(
                            'font-pacifico text-xl text-center opacity-1 transition-all duration-300',
                            {
                                'opacity-0 blur-sm': greetings === '...',
                                'text-md mb-4 mt-4': letter,
                            },
                        )}
                    >
                        {greetings}
                    </p>
                )}

                {showDate && published_at && (
                    <div
                        className={cn(
                            'fixed bottom-0 text-xs text-black flex gap-1 items-center scale-75 bg-white py-1 px-2 rounded-full opacity-80',
                            { 'relative bottom-auto scale-100 -ml-1': letter },
                        )}
                        data-html2canvas-ignore
                    >
                        <Clock3 size='0.80rem' />
                        {datePrefix + formatDistanceToNow(date, { locale })}
                    </div>
                )}
            </Card>
        </QuoteProvider>
    );
}
