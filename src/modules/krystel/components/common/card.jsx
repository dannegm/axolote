import { cn } from '@/modules/core/helpers/utils';

export default function Card({
    className,
    classNames,
    border = '',
    scheme = 'bg-white text-gray-600',
    children,
    letter,
    fullscreen,
    frame,
    dark,
}) {
    return (
        <div
            data-layer='animation'
            className={cn(
                'group relative',
                'animate-in fade-in-0 slide-in-from-bottom-6 duration-300 ease-in',
                classNames?.animation,
                { letter, fullscreen, frame, dark },
            )}
        >
            <div
                data-layer='border'
                className={cn(
                    'gift-card flex w-full max-w-sm aspect-3/4 p-6 bg-gray-200 rounded-lg shadow-xl transition-all duration-300 ease-in-out',
                    classNames?.border,
                    { 'max-w-none w-[360px] p-1 aspect-auto': letter },
                    className,
                )}
                style={{ backgroundImage: border }}
            >
                <div
                    data-layer='container'
                    className={cn('flex-1 flex w-full rounded-md', classNames?.container, {
                        'h-auto': letter,
                    })}
                >
                    <div
                        data-layer='content'
                        className={cn(
                            'flex-1 relative flex w-full h-full rounded-md flex-col items-center gap-6 md:gap-8 justify-center p-10 shadow-xl',
                            scheme,
                            classNames?.content,
                            {
                                'h-auto justify-start items-start p-6 gap-2': letter,
                                'bg-center bg-cover': frame,
                                'p-0': fullscreen,
                            },
                        )}
                        style={{
                            backgroundImage: `url(${frame})`,
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
