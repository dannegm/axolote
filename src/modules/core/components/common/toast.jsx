import { useState } from 'react';
import { Check, Lightbulb, X } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';
import CircularTimeout from './circular-timeout';

const iconClassNames = 'flex w-8 h-8 items-center justify-center rounded-full bg-gray-200';

export default function Toast({
    hidden = false,
    duration = 3000,
    persist = false,
    content,
    hasOnAccept,
    hasOnCancel,
    onAccept,
    onCancel,
}) {
    const [show, setShow] = useState(true);

    const handleAccept = ev => {
        ev.preventDefault();
        setShow(false);
        setTimeout(() => {
            onAccept?.();
        }, 500);
    };

    const handleCancel = ev => {
        ev.preventDefault();
        setShow(false);
        setTimeout(() => {
            onCancel?.();
        }, 500);
    };

    return (
        <div
            className={cn([
                'w-auto overflow-hidden bg-white rounded-full shadow-md transition-all duration-150 interpolate-size',
                //
                { 'animate-toast-in': show },
                { 'animate-toast-out': !show || hidden },
            ])}
        >
            <div className='w-[340px] flex flex-row justify-center items-center gap-4 p-2'>
                <div className={cn(iconClassNames)}>
                    {!persist && (
                        <CircularTimeout
                            className='absolute z-10 text-gray-400 -scale-y-100 -rotate-90'
                            size='2rem'
                            timeout={duration}
                        />
                    )}
                    <Lightbulb size='1rem' />
                </div>

                <div className='block flex-1 text-center'>{content}</div>
                <div className='flex flex-row gap-2'>
                    {hasOnCancel && (
                        <button
                            type='button'
                            className={cn(iconClassNames, 'bg-red-500 text-white')}
                            onClick={handleCancel}
                        >
                            <X size='1rem' />
                        </button>
                    )}
                    {hasOnAccept && (
                        <button
                            type='button'
                            className={cn(iconClassNames, 'bg-green-500 text-white')}
                            onClick={handleAccept}
                        >
                            <Check size='1rem' />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
