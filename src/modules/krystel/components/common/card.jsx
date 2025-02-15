import { cn } from '@/modules/core/helpers/utils';

export default function Card({
    classNames,
    border = '',
    scheme = 'bg-white text-gray-600',
    children,
    letter,
    frame,
}) {
    return (
        <div
            className={cn(
                'gift-card fade-slide-up flex w-full max-w-sm aspect-[3/4] p-6 bg-gray-200 rounded-lg shadow-xl transition-all duration-300 ease-in-out',
                classNames?.border,
                { 'max-w-none w-[360px] p-1 aspect-auto': letter },
            )}
            style={{ backgroundImage: border }}
        >
            <div
                className={cn(
                    'flex-1 w-full h-full rounded overflow-hidden bg-white text-gray-800 shadow-xl',
                    classNames?.container,
                    { 'h-auto': letter },
                )}
            >
                <div
                    className={cn(
                        'relative flex h-full flex-col items-center gap-6 md:gap-8 justify-center p-10',
                        scheme,
                        classNames?.content,
                        { 'h-auto justify-start items-start p-6 gap-2': letter },
                        { 'bg-center bg-cover': frame },
                    )}
                    style={{
                        backgroundImage: `url(${frame})`,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
