'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Save, Loader2 } from 'lucide-react';

import { Button } from '@/modules/shadcn/ui/button';
import { Textarea } from '@/modules/shadcn/ui/textarea';

import GiftCard from '@/modules/krystel/components/common/gift-card';
import { cn } from '@/modules/core/helpers/utils';
import useCreateQuoteAction from '@/modules/krystel/hooks/use-create-quote-action';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const rich = (text = '') => text.replaceAll('\n', '||');

export default function CardEditor() {
    const router = useRouter();
    const [content, setContent] = useState('');
    const [posting, setPosting] = useState(false);

    const canSave = content !== '';

    const createQuote = useCreateQuoteAction({
        onSuccess: () => {
            router.push('/krystel/secrets/cards');
        },
        onError: () => {
            setPosting(false);
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
        setPosting(true);
        const preparedContent = prepare(content);
        createQuote(preparedContent);
    };

    return (
        <div className={cn('mt-4', 'lg:flex lg:flex-row lg:gap-4')}>
            <div id='global-bg-portal' />
            <div id='card-bg-portal' />

            <div
                className={cn(
                    'border-gray-300 bg-gray-100',
                    'fixed z-50 left-0 bottom-0 w-full border-t shadow-[0px_-2px_24px_4px_rgba(0,_0,_0,_0.1)]',
                    'lg:relative lg:left-auto lg:bottom-auto lg:w-72 lg:h-auto lg:max-h-fit lg:border lg:rounded-md lg:shadow-none',
                )}
            >
                <div
                    className={cn(
                        'flex flex-col gap-2 p-4 pt-2 pb-14',
                        'md:w-3/4 md:mx-auto',
                        'lg:w-full lg:p-4 lg:gap-4',
                    )}
                >
                    <Textarea
                        className='bg-white'
                        placeholder='Cuéntale a Krys lo mucho que la amas.'
                        value={content}
                        onChange={handleChange}
                    />

                    {posting ? (
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
