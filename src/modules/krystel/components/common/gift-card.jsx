'use client';
import { useEffect } from 'react';
import { Asterisk, Clock3, icons } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es as locale } from 'date-fns/locale';

import { cn } from '@/modules/core/helpers/utils';
import { isElevenEleven, isThreeInTheMorning } from '@/modules/krystel/helpers/dates';
import {
    extractConfigsAndContent,
    replaceWithLongestSentence,
} from '@/modules/krystel/helpers/strings';

import usePostAction from '@/modules/krystel/hooks/use-post-action';
import useFirstAppearance from '@/modules/krystel/hooks/use-first-appearance';

import { useGreetings } from '@/modules/krystel/services/greetings';

import RichText from './rich-text';
import Card from './card';
import Portal from '@/modules/core/components/common/portal';

export default function GiftCard({
    quote,
    icon,
    border = '',
    scheme = 'bg-white text-gray-600',
    settings,
    created_at,
}) {
    const [id] = settings.split(':');
    const firstAppearance = useFirstAppearance(id);

    const postView = usePostAction({ action: 'view', settings });

    if (isElevenEleven()) {
        quote = '({icon:hidden})[[[pray]]]$$11:11$$ pide un deseo.';
    }

    if (isThreeInTheMorning()) {
        quote = '({icon:hidden})[[[[ufo]]]]';
    }

    const { configs, content } = extractConfigsAndContent(quote);
    const isLongText = replaceWithLongestSentence(content).length > 120;
    const greetings = configs?.greetings || useGreetings();
    const letter = configs?.letter;
    const LucideIcon = configs?.icon !== 'hidden' ? icons[configs?.icon] || icons[icon] : <></>;

    useEffect(() => {
        postView();
    }, []);

    return (
        <Card
            border={configs?.border ? '' : border}
            scheme={scheme}
            letter={letter}
            classNames={{
                border: cn({ 'bg-none': configs?.border }, configs?.border),
                content: cn(configs?.scheme),
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

            {!configs?.fullscreen && configs?.badge !== 'hidden' && !firstAppearance && (
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
                    'w-full flex-row gap-2 justify-between': letter,
                })}
            >
                {!configs?.fullscreen && configs?.name !== 'hidden' && (
                    <p
                        className={cn('font-pacifico text-3xl text-center', {
                            'text-left text-xl': letter,
                        })}
                    >
                        Krystel,
                    </p>
                )}

                {!configs?.fullscreen && configs?.icon !== 'hidden' && (
                    <div className={cn('block')}>
                        <LucideIcon
                            className={cn('text-current h-[56px] w-[56px]', { 'h-6 w-6': letter })}
                        />
                    </div>
                )}
            </div>

            <div
                className={cn('font-delius text-center text-xl font-medium leading-snug', {
                    'text-md': isLongText,
                    'text-left text-md text-balance leading-normal': letter,
                })}
            >
                <RichText>{content}</RichText>
            </div>

            {!configs?.fullscreen && configs?.greetings !== 'hidden' && (
                <p
                    className={cn(
                        'font-pacifico text-xl text-center opacity-1 transition-all duration-300',
                        {
                            'opacity-0 blur-sm': greetings === '...',
                            'text-md': letter,
                        },
                    )}
                >
                    {greetings}
                </p>
            )}

            {created_at && (
                <div
                    className={cn(
                        'fixed bottom-0 text-xs text-black flex gap-1 items-center scale-75 bg-white py-1 px-2 rounded-full opacity-80',
                        { 'relative bottom-auto scale-100 -ml-1': letter },
                    )}
                    data-html2canvas-ignore
                >
                    <Clock3 size='0.80rem' />
                    {formatDistanceToNow(new Date(created_at + 'Z'), { locale })}
                </div>
            )}
        </Card>
    );
}
