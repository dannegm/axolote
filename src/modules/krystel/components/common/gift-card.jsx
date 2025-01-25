'use client';
import { useEffect } from 'react';
import { Asterisk, Clock3, icons } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

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
    const LucideIcon = configs?.icon === 'hidden' ? <></> : icons[configs?.icon || icon];

    useEffect(() => {
        postView();
    }, []);

    return (
        <Card
            border={configs?.border ? '' : border}
            scheme={scheme}
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

            {created_at && (
                <div
                    className='fixed bottom-0 text-xs text-black flex gap-1 items-center scale-75 bg-white py-1 px-2 rounded-full opacity-80'
                    data-html2canvas-ignore
                >
                    <Clock3 size='0.80rem' />
                    {formatDistance(new Date(created_at + 'Z'), new Date(), { locale: es })}
                </div>
            )}

            {!configs?.fullscreen && configs?.badge !== 'hidden' && firstAppearance && (
                <div className='fade-in absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-pink-600 rounded-full'>
                    <Asterisk size={24} className='text-white' />
                </div>
            )}

            {!configs?.fullscreen && configs?.name !== 'hidden' && (
                <p className='font-pacifico text-3xl text-center'>Krystel,</p>
            )}

            {!configs?.fullscreen && configs?.icon !== 'hidden' && (
                <div className='block'>
                    <LucideIcon size={56} className='text-current' />
                </div>
            )}

            <div
                className={cn('font-delius text-center text-xl font-medium leading-relaxed', {
                    'text-md': isLongText,
                })}
            >
                <center>
                    <RichText>{content}</RichText>
                </center>
            </div>

            {!configs?.fullscreen && configs?.greetings !== 'hidden' && (
                <p
                    className={cn(
                        'font-pacifico text-xl text-center opacity-1 transition-all duration-300',
                        {
                            'opacity-0 blur-sm': greetings === '...',
                        },
                    )}
                >
                    {greetings}
                </p>
            )}
        </Card>
    );
}
