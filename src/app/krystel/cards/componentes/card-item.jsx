'use client';
import Link from 'next/link';
import { formatDistanceToNowStrict, format } from 'date-fns';
import { es as locale } from 'date-fns/locale';
import { Clock3 } from 'lucide-react';

import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';
import { getRandomSettings } from '@/modules/krystel/services/quotes';

export default function CardItem({ item }) {
    const code = `${item.id}:${getRandomSettings()}`;
    const date = new Date(item.created_at + 'Z');

    return (
        <div className='flex flex-col gap-4 items-start md:w-full py-4 border-t border-gray-200 text-sm'>
            <Link
                href={`/krystel?code=${code}`}
                className='flex-none w-full transition-all duration-150 lg:hover:scale-105 active:scale-95'
            >
                <GiftCardPreview quote={item.quote} code={code} hidden={!item.show} preventReveal />
            </Link>
            <span className='text-gray-500 flex gap-1 items-center text-xs'>
                <Clock3 size='0.85rem' />
                {formatDistanceToNowStrict(date, { locale })} -{' '}
                {format(date, 'MMMM d, yyyy · h:mm aaa', { locale })}
            </span>
        </div>
    );
}
