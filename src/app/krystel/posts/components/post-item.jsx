'use client';
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

const SimpleItem = ({ item }) => {
    return (
        <div className='flex-1 px-4 py-2 bg-gray-100 rounded-md rounded-tl-none'>
            {item.content}
        </div>
    );
};

const EmergencyItem = ({ item }) => {
    return (
        <div className='flex-1 px-4 py-2 bg-red-100 rounded-md rounded-tl-none'>{item.content}</div>
    );
};

const elements = {
    post: {
        key: 'post',
        icon: MessageSquareHeart,
        component: SimpleItem,
    },
    emergency: {
        key: 'emergency',
        icon: Siren,
        component: EmergencyItem,
    },
};

export default function PostItem({ item }) {
    const Icon = elements[item.type].icon || elements.post.icon;
    const Element = elements[item.type].component || elements.post.component;
    const date = new Date(item.created_at);
    const datePrefix = isBefore(date, new Date()) ? 'hace ' : 'dentro de ';

    return (
        <div className='flex flex-col gap-2 items-start md:w-full py-4 border-t border-gray-200 text-sm first:border-none'>
            <div className='flex flex-row gap-2'>
                <div className='flex-none flex-center w-8 h-8 bg-slate-200 text-slate-800 rounded-2xl'>
                    <Icon size='1rem' />
                </div>
                <Element item={item} />
            </div>

            <span className='text-gray-500 flex gap-1 items-center text-xs'>
                <Clock3 size='0.85rem' />
                {datePrefix + formatDistanceToNowStrict(date, { locale })} -{' '}
                {format(date, 'MMMM d, yyyy · h:mm aaa', { locale })}
            </span>
        </div>
    );
}
