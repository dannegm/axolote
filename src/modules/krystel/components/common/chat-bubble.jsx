import { cn } from '@/modules/core/helpers/utils';

const debug = 'outline-pink-500 outline-dashed outline-1';

export default function ChatBubble({ children, type = 'sender' }) {
    return (
        <div
            className={cn(type, 'peer flex justify-start -my-2 first:mt-0 last:mb-0', {
                'flex-row-reverse': type === 'sender',
                'flex-row': type === 'receiver',
            })}
        >
            <div
                className={cn(
                    'px-2 py-1.5 w-auto max-w-4/5 wrap-break-word text-pretty rounded-md',
                    {
                        'bg-slate-900/90 text-slate-100 mix-blend-darken rounded-br-none':
                            type === 'sender',
                        'bg-slate-200/90 text-slate-900 mix-blend-darken rounded-bl-none':
                            type === 'receiver',
                    },
                )}
            >
                {children}
            </div>
        </div>
    );
}
