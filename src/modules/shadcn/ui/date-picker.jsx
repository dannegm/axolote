import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { Button } from '@/modules/shadcn/ui/button';
import { Calendar } from '@/modules/shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shadcn/ui/popover';

function DatePicker({ date, onChange }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon className='mr-2 size-4' />
                    {date ? format(date, 'MMM do, yyyy') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='w-auto p-0'>
                <Calendar mode='single' selected={date} onSelect={onChange} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
DatePicker.displayName = 'DatePicker';

export { DatePicker };
