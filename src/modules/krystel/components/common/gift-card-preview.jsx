'use client';
import { icons, Asterisk } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';

import { getRandomQuote, quoteFromSettings } from '@/modules/krystel/services/quotes';
import { getTheme } from '@/modules/krystel/helpers/themes';
import { extractConfigsAndContent } from '@/modules/krystel/helpers/strings';
import { buildPreviewElements } from '@/modules/krystel/helpers/rich-elements';
import { useFirstAppearanceAnom } from '@/modules/krystel/hooks/use-first-appearance';

import RichText from './rich-text';

export default function GiftCardPreview({
    className,
    quote,
    code,
    hidden = false,
    preview = false,
    deleted = false,
    preventReveal = false,
}) {
    let quoteSettings = getRandomQuote();

    const [id] = code?.split(':') || [null];
    const isFirstAppearance = useFirstAppearanceAnom(id);

    if (code) {
        const [, ...settings] = code.split(':');
        quoteSettings = quoteFromSettings(settings.join(':'));
    }

    const { configs, content } = extractConfigsAndContent(quote);
    const greetings = configs?.greetings || '';
    const letter = configs?.letter;
    const frame = configs?.frame;
    const dark = configs?.dark;
    const LucideIcon =
        configs?.icon === 'hidden' ? <></> : icons[configs?.icon || quoteSettings.icon];

    const customElements = buildPreviewElements({ letter, preventReveal });
    const hasApp = /<app::/g.test(content);

    const theme = getTheme(configs?.theme);

    return (
        <div
            className={cn(
                'relative overflow-hidden bg-gray-100 bg-center bg-[length:50%] p-2 rounded-md shadow-xl transition-all duration-150',
                {
                    'bg-none': configs?.bg,
                    'blur-xs select-none': hidden && isFirstAppearance,
                    'blur-none md:blur-xs md:hover:blur-none ring-4 md:ring-0 ring-slate-300 ring-offset-4 md:ring-offset-0 opacity-60 md:opacity-100':
                        preview && hidden,
                    'blur-none md:blur-none ring-4 ring-red-600 ring-offset-4 opacity-60 md:ring-4 md:ring-red-600 md:ring-offset-4 md:opacity-60':
                        deleted,
                },
                className,
                theme?.card,
            )}
            style={{ backgroundImage: configs?.bg ? '' : quoteSettings.bg }}
        >
            {configs?.bg && (
                <div
                    className={cn(
                        'absolute z-0 inset-0 pointer-events-none',
                        configs?.bg,
                        theme?.bg,
                    )}
                />
            )}

            <div
                className={cn(
                    'relative z-10 bg-gray-200 rounded-lg p-1 shadow-xl',
                    { 'bg-none': configs?.border },
                    configs?.border,
                    theme?.border,
                )}
                style={{ background: configs?.border ? '' : quoteSettings.border }}
            >
                <div
                    className={cn(
                        'flex flex-row gap-2 items-start p-3 rounded',
                        quoteSettings.scheme,
                        {
                            'text-white [text-shadow:_1px_1px_8px_rgb(0_0_0_/_30%)] bg-center bg-cover':
                                frame,
                            'text-black': dark,
                        },
                        configs?.scheme,
                        theme?.content,
                    )}
                    style={{
                        backgroundImage: `url(${frame})`,
                    }}
                >
                    <div className='absolute top-2 right-2 flex flex-row gap-1'>
                        {isFirstAppearance && (
                            <div
                                className={cn(
                                    'animate-in fade-in-0 duration-300 ease-in opacity-50',
                                    'flex items-center justify-center gap-2 w-4 h-4 bg-pink-600 rounded-full',
                                    theme?.badge,
                                )}
                            >
                                <Asterisk size={16} className='text-white' />
                            </div>
                        )}
                    </div>

                    {!configs?.fullscreen && configs?.icon !== 'hidden' && (
                        <div className={cn(theme?.icon)}>
                            <LucideIcon className='text-current' />
                        </div>
                    )}

                    <div className={cn('mt-[2px] font-delius font-medium pr-4', theme?.text)}>
                        <div
                            className={cn('block', {
                                'overflow-hidden line-clamp-4 mask-gradient': letter && !hasApp,
                            })}
                        >
                            <RichText elements={customElements}>{content}</RichText>
                        </div>

                        {greetings && greetings !== 'hidden' && (
                            <div className={cn('mt-2 font-pacifico', theme?.greetings)}>
                                {greetings}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
