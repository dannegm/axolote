import { icons, Asterisk, NotebookPen } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { pascalCase } from '@/modules/core/helpers/strings';

import { getRandomQuote, quoteFromSettings } from '@/modules/krystel/services/quotes';
import { getTheme } from '@/modules/krystel/helpers/themes';
import { extractConfigsAndContent } from '@/modules/krystel/helpers/strings';
import { buildPreviewElements } from '@/modules/krystel/helpers/rich-elements';
import { useFirstAppearanceAnom } from '@/modules/krystel/hooks/use-first-appearance';

import RichText from './rich-text';

const isValidCode = code => {
    const validCode = /^\d+:\d+:\d+:\d+:\d+$/;
    return validCode.test(code);
};

const getQuoteSettings = code => {
    if (!code) {
        return getRandomQuote();
    }

    if (!isValidCode(code)) {
        const theme = getTheme(code);
        return {
            settings: '0:0:0:0:0',
            icon: 'badge',
            border: theme?.border,
            bg: theme?.bg,
            scheme: theme?.content,
        };
    }

    const [, ...settings] = code.split(':');
    return quoteFromSettings(settings.join(':'));
};

export default function GiftCardPreview({
    className,
    classNames,
    quote,
    code,
    hidden = false,
    preview = false,
    deleted = false,
    upcoming = false,
    preventReveal = false,
    onClick,
}) {
    const quoteSettings = getQuoteSettings(code);

    const [id] = code?.split(':') || [null];
    const isFirstAppearance = useFirstAppearanceAnom(id);

    const { configs, content } = extractConfigsAndContent(quote);
    const greetings = configs?.greetings || '';
    const letter = configs?.letter;
    const frame = configs?.frame;
    const dark = configs?.dark;
    const LucideIcon =
        configs?.icon === 'hidden' ? <></> : icons[pascalCase(configs?.icon || quoteSettings.icon)];

    const customElements = buildPreviewElements({ letter, preventReveal });
    const hasApp = /<app::/g.test(content);
    const theme = getTheme(configs?.theme);

    return (
        <div
            data-layer='card'
            className={cn(
                'relative  bg-gray-100 bg-center bg-[length:50%] p-2 rounded-md shadow-xl transition-all duration-150',
                {
                    'bg-none': configs?.bg || theme?.bg,
                    'blur-xs select-none': hidden,
                    'blur-none outline-2 outline-slate-300 outline-offset-6': preview && hidden,
                    'blur-none outline-2 outline-sky-600 outline-offset-6 opacity-70 hover:opacity-100':
                        upcoming,
                    'blur-none outline-2 outline-red-600 outline-offset-6 opacity-70 hover:opacity-100':
                        deleted,
                    'outline-dashed opacity-50! hover:opacity-100': preview && hidden,
                },
                className,
                theme?.card,
                classNames?.card,
            )}
            style={{ backgroundImage: configs?.bg ? '' : quoteSettings.bg }}
            onClick={onClick}
        >
            {(configs?.bg || theme?.bg || classNames?.bg) && (
                <div
                    data-layer='bg'
                    className={cn(
                        'absolute z-0 inset-0 pointer-events-none rounded-md overflow-hidden',
                        configs?.bg,
                        theme?.bg,
                        classNames?.bg,
                    )}
                />
            )}

            {configs?.letter && (
                <div
                    data-layer='letter-badge'
                    className={cn(
                        'absolute z-20 -left-1 top-6 bg-indigo-200 text-indigo-400 w-6 h-6 rounded-xs shadow-sm',
                        'flex items-center justify-center [&_svg]:size-4',
                        theme?.badge,
                    )}
                >
                    <NotebookPen />
                </div>
            )}

            <div
                data-layer='border'
                className={cn(
                    'relative z-10 bg-gray-200 rounded-lg p-1 shadow-xl overflow-hidden',
                    { 'bg-none': configs?.border || theme?.border },
                    configs?.border,
                    theme?.border,
                    classNames?.border,
                )}
                style={{ background: configs?.border || theme?.border ? '' : quoteSettings.border }}
            >
                <div
                    data-layer='content'
                    className={cn(
                        'flex flex-row gap-2 items-start p-3 rounded-md',
                        quoteSettings.scheme,
                        {
                            'text-white [text-shadow:_1px_1px_8px_rgb(0_0_0_/_30%)] bg-center bg-cover':
                                frame,
                            'text-black': dark,
                        },
                        configs?.scheme,
                        theme?.content,
                        classNames?.content,
                    )}
                    style={{
                        backgroundImage: `url(${frame})`,
                    }}
                >
                    <div className='absolute top-2 right-2 flex flex-row gap-1'>
                        {isFirstAppearance && (
                            <div
                                data-layer='badge'
                                className={cn(
                                    'animate-in fade-in-0 duration-300 ease-in opacity-50',
                                    'flex items-center justify-center gap-2 size-4 bg-pink-600 rounded-full [&_svg]:size-4 [&_svg]:text-white',
                                    theme?.badge,
                                )}
                            >
                                <Asterisk />
                            </div>
                        )}
                    </div>

                    {!configs?.fullscreen && configs?.icon !== 'hidden' && (
                        <div data-layer='icon' className={cn(theme?.icon)}>
                            <LucideIcon className='text-current' />
                        </div>
                    )}

                    <div
                        data-layer='text'
                        className={cn(
                            'mt-[2px] font-delius font-medium pr-4',
                            theme?.text,
                            classNames?.text,
                        )}
                    >
                        <div
                            data-layer='text-wrapper'
                            className={cn('block', {
                                'overflow-hidden line-clamp-4 mask-gradient': letter && !hasApp,
                            })}
                        >
                            <RichText elements={customElements}>{content}</RichText>
                        </div>

                        {greetings && greetings !== 'hidden' && (
                            <div
                                data-layer='greetings'
                                className={cn('mt-2 font-pacifico', theme?.greetings)}
                            >
                                {greetings}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
