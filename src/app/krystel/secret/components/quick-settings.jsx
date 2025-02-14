'use client';
import { useLocalStorage } from '@uidotdev/usehooks';

import { cn } from '@/modules/core/helpers/utils';

export default function QuickSettings({ classNames }) {
    const [skipActions, setSkipActions] = useLocalStorage('settings:skip_actions', false);

    return (
        <div
            className={cn(
                'flex flex-col gap-2 bg-gray-200 px-4 py-2 rounded-md mt-2',
                classNames?.container,
            )}
        >
            <div className='flex flex-row justify-between items-center'>
                <labe htmlFor='skip-actions'>Skip Actions</labe>
                <input
                    type='checkbox'
                    id='skip-actions'
                    checked={skipActions}
                    onChange={() => setSkipActions(!skipActions)}
                />
            </div>
        </div>
    );
}
