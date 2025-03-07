'use client';
import { format } from 'date-fns';
import { RefreshCcw } from 'lucide-react';

import { cn } from '@/modules/shadcn/lib/utils';
import useSettings from '@/modules/core/hooks/use-settings';

import ClientOnly from '@/modules/core/components/common/client-only';
import LogsList from './logs-list';

export default function LogsMain({ data = [], onReload }) {
    const [logsRealtime] = useSettings('settings:logs:realtime', false);
    const [showBreakpointIndicator] = useSettings('settings:show_breakpoint_indicator', false);
    if (!data || !data?.length) return null;

    return (
        <ClientOnly>
            <div className='grid grid-flow-row pb-16'>
                <div className='flex items-center gap-2 bg-slate-700 text-white text-sm px-3 py-1 rounded-sm shadow-xs mt-2 mb-2'>
                    <div
                        className={cn('size-2 bg-gray-500 rounded-full shadow', {
                            'bg-green-500 animate-pulse duration-500': logsRealtime,
                        })}
                    />
                    <div>
                        Last updated <b>{format(new Date(), "MMM do, ''yy · HH:mm")}</b>
                    </div>
                </div>

                <div
                    className={cn('fixed z-50 bottom-4 right-4 transition-all duration-150', {
                        'bottom-16': showBreakpointIndicator,
                    })}
                >
                    <button
                        type='button'
                        className='flex-center size-16 sm:size-12 bg-black text-white rounded-full shadow-lg transition-all duration-150 ease-in-out hover:scale-105 active:scale-95'
                        onClick={() => onReload?.(key => key + 1)}
                    >
                        <RefreshCcw />
                    </button>
                </div>

                <LogsList data={data} logsRealtime={logsRealtime} />
            </div>
        </ClientOnly>
    );
}
