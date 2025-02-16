'use client';

import { cn } from '@/modules/core/helpers/utils';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';

import { Label } from '@/modules/shadcn/ui/label';
import { Switch } from '@/modules/shadcn/ui/switch';

export default function QuickSettings({ classNames }) {
    const [skipActions, setSkipActions] = useLocalStorage('settings:skip_actions', false);
    const [showQuickSettings] = useLocalStorage('settings:show_quick_settings', false);

    if (!showQuickSettings) return null;

    return (
        <div
            className={cn(
                'flex flex-col gap-2 bg-gray-200 px-4 py-2 rounded-md mt-2',
                classNames?.container,
            )}
        >
            <div className='flex flex-row justify-between items-center'>
                <Label htmlFor='skip-actions'>Skip Actions</Label>
                <Switch
                    id='skip-actions'
                    checked={skipActions}
                    onCheckedChange={() => setSkipActions(!skipActions)}
                />
            </div>
        </div>
    );
}
