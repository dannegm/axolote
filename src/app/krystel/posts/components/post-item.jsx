'use client';
import { cn } from '@/modules/core/helpers/utils';
import { formatDistanceToNowStrict, format, isBefore } from 'date-fns';
import { es as locale } from 'date-fns/locale';

import {
    Clock3,
    CassetteTape,
    HandHeart,
    Image,
    Loader2,
    MessageSquareHeart,
    PenTool,
    SendHorizonal,
    Siren,
    Trash2,
} from 'lucide-react';

import { feelings } from '@/modules/krystel/helpers/feelings';
import { getColorClassName } from '@/modules/krystel/helpers/colors';

const SimpleItem = ({ item }) => {
    return (
        <div className='flex-1 px-4 py-2 bg-gray-100 rounded-xl rounded-tl-none'>
            {item.content}
        </div>
    );
};

const FeelingItem = ({ item }) => {
    const bgClassName = getColorClassName('bg', feelings[item.content]?.color, 300);
    const icon = feelings[item.content]?.icon || item.content;

    return (
        <div
            className={cn(
                'flex-1 flex flex-col flex-center gap-2 p-4 bg-violet-100 rounded-xl rounded-tl-none',
                bgClassName,
            )}
        >
            {icon !== item.content && <span className='block h-16 pt-5 text-[4rem]'>{icon}</span>}
            <span
                className={cn(
                    'flex-1 block font-noto font-bold text-md text-white text-center opacity-90',
                    {
                        'text-black': !bgClassName,
                    },
                )}
            >
                {`~ ${item.content} ~`}
            </span>
        </div>
    );
};

const EmergencyItem = ({ item }) => {
    return (
        <div className='flex-1 px-4 py-2 bg-red-100 rounded-xl rounded-tl-none'>{item.content}</div>
    );
};

const elements = {
    post: {
        key: 'post',
        icon: MessageSquareHeart,
        iconClassName: '',
        component: SimpleItem,
    },
    feeling: {
        key: 'feeling',
        icon: HandHeart,
        iconClassName: 'bg-violet-600 text-white',
        component: FeelingItem,
    },
    emergency: {
        key: 'emergency',
        icon: Siren,
        iconClassName: 'bg-red-600 text-white',
        component: EmergencyItem,
    },
};

export default function PostItem({ item }) {
    const Element = elements[item.type]?.component || elements.post.component;
    const Icon = elements[item.type]?.icon || elements.post.icon;
    const iconClassName = elements[item.type]?.iconClassName || elements.post.iconClassName;

    const date = new Date(item.created_at);
    const datePrefix = isBefore(date, new Date()) ? 'hace ' : 'dentro de ';

    return (
        <div className='flex flex-col gap-2 items-start md:w-full py-4 border-t border-gray-200 text-sm first:border-none'>
            <div className='flex flex-row gap-2'>
                <div
                    className={cn(
                        'flex-none flex-center w-8 h-8 bg-slate-200 text-slate-800 rounded-2xl',
                        iconClassName,
                    )}
                >
                    <Icon size='1rem' />
                </div>

                <div className='flex flex-col items-start gap-1'>
                    {item.context && (
                        <div className='text-xs font-noto font-bold text-slate-500'>
                            {item.context}
                        </div>
                    )}
                    <div className='flex-none'>
                        <Element item={item} />
                    </div>

                    <span className='text-gray-500 flex gap-1 items-center text-xs'>
                        <Clock3 size='0.85rem' />
                        {datePrefix + formatDistanceToNowStrict(date, { locale })} -{' '}
                        {format(date, 'MMMM d, yyyy · h:mm aaa', { locale })}
                    </span>
                </div>
            </div>
        </div>
    );
}
