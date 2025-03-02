'use client';
import { cn } from '@/modules/core/helpers/utils';

import { Switch } from '@/modules/shadcn/ui/switch';
import { DatePicker } from '@/modules/shadcn/ui/date-picker';
import { Separator } from '@/modules/shadcn/ui/separator';

import { Label } from '@/modules/shadcn/ui/label';
import { TimePicker } from '@/modules/shadcn/ui/time-picker';

export default function CardEditorAdvanced({
    className,
    includesPushidedDate,
    setIncludesPushidedDate,
    publishedDate,
    setPublishedDate,
    publishedTime,
    setPublishedTime,
    showCardViewport,
    setShowCardViewport,
    pasteReplace,
    setPasteReplace,
}) {
    return (
        <div className={cn('flex flex-col gap-4 pb-4', className)}>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center justify-between'>
                    <Label htmlFor='includes-pushided-date'>Published date</Label>
                    <Switch
                        id='includes-pushided-date'
                        checked={includesPushidedDate}
                        onCheckedChange={() => setIncludesPushidedDate(!includesPushidedDate)}
                    />
                </div>

                <div
                    className={cn('flex flex-row gap-2', {
                        'opacity-60 pointer-events-none': !includesPushidedDate,
                    })}
                >
                    <DatePicker date={publishedDate} onChange={setPublishedDate} />
                    <TimePicker value={publishedTime} onChange={setPublishedTime} />
                </div>
            </div>

            <Separator />

            <div className='flex flex-row justify-between items-center'>
                <Label htmlFor='show-card-viewport'>Show card viewport</Label>
                <Switch
                    id='show-card-viewport'
                    checked={showCardViewport}
                    onCheckedChange={setShowCardViewport}
                />
            </div>

            <Separator />

            <div className='flex flex-row justify-between items-center'>
                <Label htmlFor='replace-on-paste'>Peplace on paste</Label>
                <Switch
                    id='replace-on-paste'
                    checked={pasteReplace}
                    onCheckedChange={setPasteReplace}
                />
            </div>
        </div>
    );
}
