import { cn } from '@/modules/core/helpers/utils';

export default function Card({
    classNames,
    border = '',
    scheme = 'bg-white text-gray-600',
    children,
}) {
    return (
        <div
            className={cn(
                'gift-card fade-slide-up w-full max-w-sm aspect-[3/4] bg-gray-200 rounded-lg p-6 shadow-xl transition-all duration-300 ease-in-out',
                classNames?.border,
            )}
            style={{ backgroundImage: border }}
        >
            <div
                className={cn(
                    'w-full h-[calc(100%_-_1.5rem)] md:h-[calc(100%_-_3rem)] xl:h-full rounded overflow-hidden bg-white text-gray-800 shadow-xl',
                    classNames?.container,
                )}
            >
                <div
                    className={cn(
                        'relative flex h-full flex-col items-center gap-6 md:gap-8 justify-center p-10',
                        scheme,
                        classNames?.content,
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
