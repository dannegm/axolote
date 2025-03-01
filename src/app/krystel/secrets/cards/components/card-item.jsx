'use client';
import Link from 'next/link';
import { formatDistanceToNowStrict, format, isBefore } from 'date-fns';
import { Clock3, ExternalLink, Eye } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import JsonViewer from '@/modules/core/components/common/json-viewer';

import { getRandomSettings } from '@/modules/krystel/services/quotes';
import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';

import ToggleCardButton from './toggle-card-switch';
import DeleteCardButton from './delete-card-button';
import RestoreCardButton from './restore-card-button';

export default function CardItem({ item }) {
    const code = `${item.id}:${getRandomSettings()}`;
    const date = new Date(item.published_at + 'Z');
    const deleted = Boolean(item.deleted_at);

    const dateSuffix = isBefore(date, new Date()) ? ' ago' : ' ahead';

    return (
        <div
            className={cn(
                'flex flex-col h-auto gap-4 items-start w-full py-4 border-t border-gray-200 text-sm transition-all duration-150',
            )}
        >
            <div className='flex flex-row gap-4 items-start justify-center w-full'>
                <Link
                    className='bg-slate-200 hover:bg-slate-700 text-slate-600 hover:text-white flex gap-2 text-xs items-center py-1 px-2 font-bold rounded-md transition-all duration-150'
                    href={`/krystel?code=${code}`}
                    target='_blank'
                >
                    Open in a new tab <ExternalLink size='0.85rem' />
                </Link>

                <div className='flex-1' />
                {deleted ? <RestoreCardButton id={item.id} /> : <DeleteCardButton id={item.id} />}
            </div>

            <a
                href={`/krystel?code=${code}`}
                className='flex-none w-full transition-all duration-150 lg:hover:scale-105 active:scale-95'
            >
                <GiftCardPreview
                    quote={item.quote}
                    code={code}
                    hidden={!item.show}
                    deleted={deleted}
                    preview
                />
            </a>

            <div className='flex-none w-full'>
                <JsonViewer name='payload' data={item} />
            </div>

            <div className='flex flex-row gap-2 items-center w-full'>
                <div className='flex gap-1 items-center text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full'>
                    <Eye size='1rem' />
                    {item.views}
                </div>
                <div className='text-gray-500 flex gap-1 items-center text-xs'>
                    <Clock3 size='0.85rem' />
                    <span>
                        {formatDistanceToNowStrict(date) + dateSuffix} -{' '}
                        {format(date, "MMM d, ''yy · HH:mm")}
                    </span>
                </div>

                <div className='flex-1' />

                <ToggleCardButton id={item.id} show={item.show} />
            </div>
        </div>
    );
}
