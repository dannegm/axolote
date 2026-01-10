import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import {
    Clock3,
    ExternalLink,
    BookMarked,
    MessageSquareQuote,
    SquareDashed,
    FlaskConical,
    Eye,
    LockKeyhole,
} from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import Badge from '@/modules/core/components/tremor/badge';
import JsonViewer from '@/modules/core/components/common/json-viewer';
import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';

import { UserAgentInfo } from './user-agent-info';
import DeleteLogButton from './delete-log-button';
import { capCase } from '@/modules/core/helpers/strings';

const defaultIcon = <SquareDashed />;
const pages = {
    login: {
        icon: <LockKeyhole />,
        label: 'Login',
        link: '/krys/login',
    },
    cards: {
        icon: <BookMarked />,
        label: 'Cards',
        link: '/krys/cards',
    },
    posts: {
        icon: <MessageSquareQuote />,
        label: 'Posts',
        link: '/krys/posts',
    },
    test: {
        icon: <FlaskConical />,
        label: 'Test',
        link: '/krys/test',
    },
    unavailable: {
        icon: <SquareDashed />,
        label: 'App not Available',
        link: '/krystel',
    },
};

export default function LogItem({ item, realtime }) {
    const [deleting, setDeleting] = useState(false);
    const date = new Date(item.created_at + 'Z');

    return (
        <div
            className={cn(
                'flex flex-col h-auto md:flex-row gap-4 lg:gap-8 py-4 border-t border-gray-200 text-sm transition-all duration-300 opacity-100 interpolate-size',
                {
                    'opacity-0 h-0 overflow-hidden': deleting,
                    'anim animate-in slide-in-from-top-32 duration-300': realtime,
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
                            href={`/krys?code=${item.metadata?.code}`}
                            target='_blank'
                        >
                            Open in a new tab <ExternalLink size='0.85rem' />
                        </a>
                    )}
                    <div className='flex-1' />
                    <DeleteLogButton id={item.id} onDelete={() => setDeleting(true)} />
                </div>
                <div className='flex-none w-full'>
                    {item.type !== 'page_view' && item.quote && (
                        <a
                            href={`/krys?code=${item.metadata?.code}`}
                            className='flex-none w-full transition-all duration-150 lg:hover:scale-105 active:scale-95'
                        >
                            <GiftCardPreview
                                quote={item.quote.quote}
                                code={item.metadata?.code}
                                preview
                            />
                        </a>
                    )}
                    {item.type === 'page_view' && (
                        <a href={pages[item.metadata?.page]?.link || '#'}>
                            <div className='flex flex-row gap-2 p-2 items-center justify-start bg-white border-2 rounded-md shadow-2xs'>
                                {pages[item.metadata?.page]?.icon || defaultIcon}
                                <span className='font-bold'>
                                    {pages[item.metadata?.page]?.label ||
                                        capCase(item.metadata?.page)}
                                </span>
                            </div>
                        </a>
                    )}
                </div>
                <div className='flex-none w-full'>
                    <JsonViewer name='payload' data={item} />
                </div>

                <div className='flex flex-row gap-2 items-center w-full'>
                    {item?.quote?.views && (
                        <div className='flex gap-1 items-center text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full'>
                            <Eye size='1rem' />
                            {item?.quote?.views}
                        </div>
                    )}
                    <div className='text-gray-500 flex gap-1 items-center text-xs'>
                        <Clock3 size='0.85rem' />
                        <span>
                            {formatDistanceToNow(date)} - {format(date, 'MMM do, yyyy · h:mm aaa')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
