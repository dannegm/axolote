'use client';
import { formatDistance } from 'date-fns';
import { Clock3 } from 'lucide-react';

import Badge from '@/modules/core/components/tremor/badge';
import { UserAgentInfo } from './user-agent-info';
import CardPreview from '../../../modules/krystel/components/common/card-preview';

export default function LogItem({ item }) {
    return (
        <div className='flex flex-col md:flex-row gap-4 lg:gap-8 py-4 border-t border-gray-200 text-sm'>
            <div className='flex flex-col gap-2 items-start md:w-3/6'>
                <span>{item.ip_location}</span>
                <Badge variant='neutral'>{item.ip}</Badge>
                <UserAgentInfo userAgent={item.user_agent} />
            </div>

            <div className='flex flex-col gap-4 items-start md:w-full'>
                <div className='flex gap-2'>
                    <Badge variant={item.type}>{item.type}</Badge>
                </div>
                <span className='flex-none w-full'>
                    <CardPreview quote={item.quotes.quote} code={item.metadata?.code} />
                </span>
                <span className='text-gray-500 flex gap-1 items-center'>
                    <Clock3 size='0.85rem' />
                    {formatDistance(new Date(item.created_at + 'Z'), new Date())}
                </span>
            </div>
        </div>
    );
}
