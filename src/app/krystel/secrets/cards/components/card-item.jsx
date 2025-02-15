'use client';
import Link from 'next/link';
import { formatDistanceToNowStrict, format, isBefore } from 'date-fns';
import { es as locale } from 'date-fns/locale';
import { Clock3, ExternalLink } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import JsonViewer from '@/modules/core/components/common/json-viewer';

import { getRandomSettings } from '@/modules/krystel/services/quotes';
import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';

import DeleteCardButton from './delete-card-button';
import ToggleCardButton from './toggle-card-switch';
import { useState } from 'react';

export default function CardItem({ item }) {
    const [deleting, setDeleting] = useState(false);

    const code = `${item.id}:${getRandomSettings()}`;
    const date = new Date(item.published_at + 'Z');

    const datePrefix = isBefore(date, new Date()) ? 'hace ' : 'dentro de ';

    return (
        <div
            className={cn(
                'flex flex-col h-auto gap-4 items-start w-full py-4 border-t border-gray-200 text-sm transition-all duration-150',
                {
                    'opacity-0 h-0 overflow-hidden': deleting,
                },
            )}
        >
            <div className='flex flex-row gap-4 items-start justify-center w-full'>
                <Link
                    className='bg-slate-200 hover:bg-slate-700 text-slate-600 hover:text-white flex gap-2 text-xs items-center py-1 px-2 font-bold rounded-md transition-all duration-150'
                    href={`/krystel?code=${code}&skip-actions=true`}
                    target='_blank'
                >
                    Open in a new tab <ExternalLink size='0.85rem' />
                </Link>

                <div className='flex-1' />
                <DeleteCardButton id={item.id} onDelete={() => setDeleting(true)} />
            </div>

            <div className='flex-none w-full'>
                <GiftCardPreview
                    quote={item.quote}
                    code={code}
                    hidden={!item.show}
                    preview
                    preventReveal
                />
            </div>

            <div className='flex-none w-full'>
                <JsonViewer name='payload' data={item} />
            </div>

            <div className='flex flex-row gap-4 items-start justify-center w-full'>
                <div className='text-gray-500 flex gap-1 items-center text-xs'>
                    <Clock3 size='0.85rem' />
                    <span>
                        {datePrefix + formatDistanceToNowStrict(date, { locale })} -{' '}
                        {format(date, 'MMMM d, yyyy · h:mm aaa', { locale })}
                    </span>
                </div>

                <div className='flex-1' />

                <ToggleCardButton id={item.id} show={item.show} />
            </div>
        </div>
    );
}
