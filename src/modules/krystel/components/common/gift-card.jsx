import { useEffect } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { formatDistanceToNow, formatDistanceToNowStrict, isBefore } from 'date-fns';
import { es as locale } from 'date-fns/locale';
import { Asterisk, Clock3, icons } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { pascalCase } from '@/modules/core/helpers/strings';
import useScrollPosition from '@/modules/core/hooks/use-scroll-position';
import useHasElapsedTime, { ElapsedTime } from '@/modules/core/hooks/use-has-elapsed-time';
import useSettings from '@/modules/core/hooks/use-settings';
import Portal from '@/modules/core/components/common/portal';

import { getTheme } from '@/modules/krystel/helpers/themes';
import {
    isElevenEleven,
    isFoolsDay,
    isRoundedDay,
    isThreeInTheMorning,
    isWomenDay,
} from '@/modules/krystel/helpers/dates';
import {
    extractConfigsAndContent,
    mergeConfigs,
    replaceWithLongestSentence,
} from '@/modules/krystel/helpers/strings';

import QuoteProvider from '@/modules/krystel/providers/quote-provider';

import usePostAction from '@/modules/krystel/hooks/use-post-action';
import useFirstAppearance from '@/modules/krystel/hooks/use-first-appearance';
import useTrackAction from '@/modules/krystel/hooks/use-track-action';
import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';
import { useGreetings } from '@/modules/krystel/services/greetings';

import RichText from './rich-text';
import Card from './card';

const secretDiscover = (discover, secrets = {}) => {
    Object.entries(secrets).forEach(([key, condition]) => {
        if (condition) {
            discover(key);
        }
    });
};

const conditionalQuote = (quote, maps) => {
    const reverseMaps = [...maps].reverse();
    return reverseMaps.reduce((q, { condition, mapper }) => {
        if (!condition) return q;
        return mapper?.(q);
    }, quote);
};

export default function GiftCard({
    className,
    classNames = {},
    quote = '...',
    icon = 'Badge',
    bg = '',
    border = '',
    scheme = 'bg-white text-gray-600',
    settings = 'none',
    published_at = undefined,
    show,
}) {
    const [uwu] = useQueryState('uwu', parseAsBoolean.withDefault(false));

    const { discover } = useEasterEggs();
    const [ignoreConditionalQuotes] = useSettings(
        'settings:cards:ignore_conditional_quotes',
        false,
    );

    const [skipWomenDay] = useSettings('specials:skip_women_day', false);
    const [skipFoolsDay] = useSettings('specials:skip_fools_day', false);
    const [skipRoundedDay] = useSettings('specials:skip_rounded_day', false);

    const [id] = settings.split(':');
    const firstAppearance = useFirstAppearance(id);

    useTrackAction();
    const postView = usePostAction({ action: 'view', settings });
    const postReadCompleteAction = usePostAction({ action: 'read_complete', settings });

    const elevenEleven = isElevenEleven();
    const threeInTheMorning = isThreeInTheMorning();
    const foolsDay = isFoolsDay();
    const womenDay = isWomenDay();
    const roundedDay = isRoundedDay();
    const monthHasBeenPassed = useHasElapsedTime('record:last_visit', 30 * 24 * 60 * 60 * 1000);

    secretDiscover(discover, {
        hidden_card: !show,
        eleven_eleven: elevenEleven,
        ufo_time: threeInTheMorning,
        fools_day: foolsDay,
        uwu_mode: uwu,
        long_long_time: monthHasBeenPassed === ElapsedTime.PASSED,

        secret_card: id === '128',
        nyancat: id === '127',
        locos: id === '163',
    });

    const preparedQuote = conditionalQuote(quote, [
        {
            condition: ignoreConditionalQuotes,
            mapper: () => quote,
        },
        {
            condition: elevenEleven,
            mapper: () => '({icon:hidden}) <badge::pray>$$11:11$$ pide un deseo.',
        },
        {
            condition: threeInTheMorning,
            mapper: () => '({icon:hidden}) <sticker::ufo>',
        },
        {
            condition: !skipWomenDay && womenDay,
            mapper: () => mergeConfigs('({theme:deepPurple})', quote),
        },
        {
            condition: !skipFoolsDay && foolsDay,
            mapper: () => mergeConfigs('({theme:fools|border:rotate-180})', quote),
        },
        {
            condition: !skipRoundedDay && roundedDay,
            mapper: () => mergeConfigs('({theme:rounded})', quote),
        },
    ]);

    const generatedGreetings = useGreetings();

    const { configs, content } = extractConfigsAndContent(preparedQuote);
    const isLongText = replaceWithLongestSentence(content).length > 120;
    const greetings = configs?.greetings || generatedGreetings;
    const letter = configs?.letter;
    const frame = configs?.frame;
    const dark = configs?.dark;
    const showDate = configs?.date !== 'hidden';
    const LucideIcon =
        configs?.icon !== 'hidden' ? (
            icons[pascalCase(configs?.icon)] || icons[pascalCase(icon)]
        ) : (
            <></>
        );

    const date = published_at ? new Date(published_at + 'Z') : new Date();
    const datePrefix = isBefore(date, new Date()) ? 'hace ' : 'dentro de ';

    const theme = getTheme(configs?.theme);

    useEffect(() => {
        if (settings !== 'none') {
            postView();
        }
    }, []);

    useScrollPosition(
        {
            tolerance: 140,
            onBottom: () => {
                if (id === '158') {
                    discover('tldr');
                    postReadCompleteAction();
                }
            },
        },
        [id],
    );

    return (
        <QuoteProvider quote={{ settings }}>
            <Portal portalId='global-bg-portal'>
                <div
                    data-layer='bg'
                    className={cn(
                        'animate-in fade-in-0 duration-[1.5s] ease-in opacity-50',
                        'fixed inset-0 pointer-events-none bg-gray-100 bg-center bg-[length:50%] transition-all',
                        classNames?.bg,
                    )}
                    style={{ backgroundImage: bg }}
                />
            </Portal>

            {(configs?.bg || theme?.bg) && (
                <Portal portalId='card-bg-portal'>
                    <div
                        data-layer='bg-custom'
                        className={cn(
                            'animate-in fade-in-0 duration-150 ease-in opacity-100',
                            'fixed inset-0 pointer-events-none transition-all',
                            theme?.bg,
                            classNames?.bg,
                            configs?.bg,
                        )}
                    />
                </Portal>
            )}

            <Card
                className={cn(theme?.card, className, classNames?.card)}
                border={configs?.border || theme?.border ? '' : border}
                scheme={scheme}
                letter={letter}
                fullscreen={configs?.fullscreen}
                frame={frame}
                dark={dark}
                classNames={{
                    animation: theme?.animation,
                    border: cn(
                        { 'bg-none': configs?.border || theme?.border },
                        theme?.border,
                        classNames?.border,
                        configs?.border,
                    ),
                    container: cn(theme?.container, classNames?.container),
                    content: cn(
                        {
                            'text-white [text-shadow:_1px_1px_8px_rgb(0_0_0_/_30%)]': frame,
                            'text-black': dark,
                        },
                        theme?.content,
                        classNames?.content,
                        configs?.scheme,
                    ),
                }}
            >
                {!configs?.fullscreen && configs?.badge !== 'hidden' && firstAppearance && (
                    <div
                        data-layer='badge'
                        className={cn(
                            'animate-in fade-in-0 duration-300 ease-in opacity-50',
                            'absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-pink-600 rounded-full',
                            { 'right-auto top-6 left-1/2 -ml-3 scale-75': letter },
                            theme?.badge,
                            classNames?.badge,
                        )}
                    >
                        <Asterisk
                            className={cn('text-white h-[56px] w-[56px]', { 'h-6 w-6': letter })}
                        />
                    </div>
                )}

                {!configs?.fullscreen && (
                    <>
                        {configs?.name !== 'hidden' && !uwu && (
                            <p
                                data-layer='name'
                                className={cn(
                                    'font-pacifico text-3xl text-center',
                                    {
                                        'text-left text-xl': letter,
                                    },
                                    theme?.name,
                                    classNames?.name,
                                )}
                            >
                                Krystel,
                            </p>
                        )}

                        {configs?.name !== 'hidden' && uwu && (
                            <img
                                data-layer='name'
                                data-variant='uwu'
                                className={cn(
                                    'block h-24 -mb-8 md:-mb-4 -mt-10 md:-mt-12',
                                    {
                                        'h-14 -mt-3 -ml-3 md:-mt-1': letter,
                                    },

                                    theme?.nameUWU,
                                    classNames?.nameUWU,
                                )}
                                src='/krystel-uwu.png'
                                alt='Krystel'
                            />
                        )}

                        {configs?.icon !== 'hidden' && (
                            <div
                                data-layer='icon'
                                className={cn('block', theme?.icon, classNames?.icon, {
                                    'absolute top-6 right-4 mt-px mr-1.5': letter,
                                })}
                            >
                                <LucideIcon
                                    className={cn(
                                        'text-current h-[56px] w-[56px]',
                                        {
                                            'h-6 w-6': letter,
                                            'drop-shadow-md': frame,
                                        },
                                        theme?.iconSVG,
                                        classNames?.iconSVG,
                                    )}
                                />
                            </div>
                        )}
                    </>
                )}

                <div
                    data-layer='text'
                    className={cn(
                        'font-delius text-center text-xl font-medium leading-snug',
                        {
                            'text-md': isLongText,
                            'w-full mt-12 font-noto text-left text-[0.825rem] text-balance hyphens-auto leading-normal':
                                letter,
                            'flex-1 w-full h-full block': configs?.fullscreen,
                            'min-w-[calc(100%+80px)] -mx-10': configs?.fullwidth,
                            'min-w-[calc(100%+48px)] -mx-6': configs?.fullwidth && letter,
                        },
                        theme?.text,
                        classNames?.text,
                    )}
                >
                    <RichText>{content}</RichText>
                </div>

                {!configs?.fullscreen && configs?.greetings !== 'hidden' && (
                    <p
                        data-layer='greetings'
                        className={cn(
                            'font-pacifico text-xl text-center transition-all duration-300',
                            {
                                'opacity-0 blur-xs': greetings === '...',
                                'text-md mb-4 mt-4': letter,
                            },
                            theme?.greetings,
                            classNames?.greetings,
                        )}
                    >
                        {greetings}
                    </p>
                )}

                {showDate && published_at && (
                    <div
                        data-layer='date'
                        className={cn(
                            'absolute bottom-0 transform translate-y-full text-xs text-black flex gap-1 items-center scale-75 bg-white py-1 px-2 rounded-full opacity-80',
                            { 'relative bottom-auto scale-100 -ml-1 translate-y-0': letter },
                            theme?.date,
                            classNames?.date,
                        )}
                        data-html2canvas-ignore
                    >
                        <Clock3 size='0.80rem' />
                        <span className='long'>
                            {datePrefix + formatDistanceToNow(date, { locale })}
                        </span>
                        <span className='hidden short'>
                            {formatDistanceToNowStrict(date, { locale })}
                        </span>
                    </div>
                )}
            </Card>
        </QuoteProvider>
    );
}
