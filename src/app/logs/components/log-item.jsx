'use client';
import { formatDistanceToNow } from 'date-fns';
import { Clock3, ExternalLink } from 'lucide-react';

import Badge from '@/modules/core/components/tremor/badge';
import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';
import { UserAgentInfo } from './user-agent-info';
import DeleteLogButton from './delete-log-button';
import { useState } from 'react';
import { cn } from '@/modules/core/helpers/utils';
import JsonViewer from '@/modules/core/components/common/json-viewer';

export default function LogItem({ item }) {
    const [deleting, setDeleting] = useState(false);
    return (
        <div
            className={cn(
                'flex flex-col h-auto md:flex-row gap-4 lg:gap-8 py-4 border-t border-gray-200 text-sm transition-all duration-300 opacity-100 interpolate-size',
                {
                    'opacity-0 h-0 overflow-hidden': deleting,
                },
            )}
        >
            <div className='flex flex-col gap-2 items-start md:w-3/6'>
                <span>{item.ip_location}</span>
                <Badge variant='neutral'>{item.ip}</Badge>
                <UserAgentInfo userAgent={item.user_agent} />
            </div>

            <div className='flex flex-col gap-4 items-start md:w-full'>
                <div className='flex w-full gap-2'>
                    <Badge variant={item.type}>{item.type}</Badge>
                    {item.metadata?.code && (
                        <a
                            className='bg-slate-200 hover:bg-slate-700 text-slate-600 hover:text-white flex gap-2 text-xs items-center px-2 font-bold rounded-md transition-all duration-150'
                            href={`/krystel?skip-actions=true&code=${item.metadata?.code}`}
                            target='_blank'
                        >
                            Open in a new tab <ExternalLink size='0.85rem' />
                        </a>
                    )}
                    <div className='flex-1' />
                    <DeleteLogButton id={item.id} onDelete={() => setDeleting(true)} />
                </div>
                <span className='flex-none w-full'>
                    <GiftCardPreview quote={item.quotes.quote} code={item.metadata?.code} />
                </span>
                <span className='flex-none w-full'>
                    <JsonViewer name='quote' data={item} />
                </span>
                <span className='text-gray-500 flex gap-1 items-center'>
                    <Clock3 size='0.85rem' />
                    {formatDistanceToNow(new Date(item.created_at + 'Z'))}
                </span>
            </div>
        </div>
    );
}
