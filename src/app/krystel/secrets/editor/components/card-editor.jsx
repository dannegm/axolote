'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    Save,
    Loader2,
    CircleDashed,
    Circle,
    ChevronDown,
    Bold,
    Italic,
    Underline,
} from 'lucide-react';

import { Button } from '@/modules/shadcn/ui/button';
import { Textarea } from '@/modules/shadcn/ui/textarea';

import GiftCard from '@/modules/krystel/components/common/gift-card';
import { cn } from '@/modules/core/helpers/utils';
import useCreateQuoteAction from '@/modules/krystel/hooks/use-create-quote-action';
import useClonePosition from '@/modules/core/hooks/use-clone-position';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const rich = (text = '') => text.replaceAll('\n', '||');

export default function CardEditor() {
    const router = useRouter();
    const [content, setContent] = useState('');

    const [$translucedButton, translucedButtonPosition] = useClonePosition();
    const [transluced, setTransluced] = useState(false);
    const [expanded, setExpanded] = useState(true);

    const canSave = content !== '';

    const createQuote = useCreateQuoteAction({
        onSuccess: () => {
            router.push('/krystel/secrets/cards');
        },
    });

    const prepare = content => {
        return content.replaceAll('\n', '\n||');
    };

    const handleChange = ev => {
        setContent(ev.target.value);
    };

    const handleSubmit = () => {
        if (!canSave) return;
        const preparedContent = prepare(content);
        createQuote.mutate(preparedContent);
    };

    return (
        <div className={cn('mt-4', 'lg:flex lg:flex-row lg:gap-4')}>
            <div id='global-bg-portal' />
            <div id='card-bg-portal' />

            <Button
                className='absolute z-[51] opacity-100'
                style={{ ...translucedButtonPosition }}
                type='button'
                size='icon'
                onClick={() => setTransluced(!transluced)}
            >
                {transluced ? <Circle /> : <CircleDashed />}
            </Button>

            <div
                className={cn(
                    'border-gray-300 bg-gray-100 transition-all duration-150',
                    'fixed z-50 left-0 bottom-0 w-full border-t shadow-[0px_-2px_24px_4px_rgba(0,_0,_0,_0.1)]',
                    'lg:relative lg:left-auto lg:bottom-auto lg:w-72 lg:h-auto lg:max-h-fit lg:border lg:rounded-md lg:shadow-none',
                    { 'opacity-30': transluced },
                )}
            >
                <div
                    className={cn(
                        'flex flex-col gap-2 p-4 pt-2 pb-14',
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
                        <Textarea
                            className='bg-white min-h-24 max-h-48'
                            placeholder='Cuéntale a Krys lo mucho que la amas.'
                            value={content}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-row gap-2'>
                        <Button type='button' size='icon' onClick={() => setExpanded(!expanded)}>
                            <ChevronDown
                                className={cn('transition-all duration-150', {
                                    'rotate-180': !expanded,
                                })}
                            />
                        </Button>

                        <div ref={$translucedButton} />

                        <div className='flex-1' />

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
                    'relative flex flex-col items-center pb-52',
                    'lg:w-96 lg:justify-center lg:mx-auto',
                )}
            >
                <GiftCard quote={rich(content) || loremIpsum} />
            </div>
        </div>
    );
}
