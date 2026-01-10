import { formatDistanceToNowStrict, format, isBefore } from 'date-fns';
import { Clock3, ExternalLink, Eye } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import JsonViewer from '@/modules/core/components/common/json-viewer';

import { isDeleted } from '@/modules/krystel/helpers/utils';
import { getRandomSettings } from '@/modules/krystel/services/quotes';
import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';

import ToggleCardButton from './toggle-card-switch';
import CardItemMenu from './card-item-menu';

export default function CardItem({ item }) {
    const code = `${item.id}:${getRandomSettings()}`;
    const date = new Date(item.published_at + 'Z');
    const deleted = isDeleted(item);
    const upcomming = new Date() < date;

    const dateSuffix = isBefore(date, new Date()) ? ' ago' : ' ahead';

    return (
        <div
            className={cn(
                'flex flex-col h-auto gap-4 items-start w-full py-4 text-sm transition-all duration-150',
            )}
        >
            <div className='flex flex-row gap-4 items-start justify-center w-full'>
                <a
                    className='bg-slate-200 hover:bg-slate-700 text-slate-600 hover:text-white flex gap-2 text-xs items-center py-1 px-2 font-bold rounded-md transition-all duration-150'
                    href={`/krys?code=${code}`}
                    target='_blank'
                >
                    Open in a new tab <ExternalLink size='0.85rem' />
                </a>

                <div className='flex-1' />
                <CardItemMenu item={item} />
            </div>

            <a
                href={`/krys?code=${code}`}
                className='flex-none w-full transition-all duration-150 lg:hover:scale-105 active:scale-95'
            >
                <GiftCardPreview
                    quote={item.quote}
                    code={code}
                    hidden={!item.show}
                    deleted={deleted}
                    upcoming={upcomming}
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
                        {format(date, "MMM do, ''yy · HH:mm")}
                    </span>
                </div>

                <div className='flex-1' />

                <ToggleCardButton id={item.id} show={item.show} />
            </div>
        </div>
    );
}
