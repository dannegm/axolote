'use client';
import { icons, Asterisk, Box } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { getRandomQuote, quoteFromSettings } from '@/modules/krystel/services/quotes';
import { extractConfigsAndContent } from '@/modules/krystel/helpers/strings';

import { useFirstAppearanceAnom } from '@/modules/krystel/hooks/use-first-appearance';

import Button from './button';
import RichText from './rich-text';
import Icon from './icon';
import Sticker from './sticker';
import SpotifyPreview from './spotify-preview';
import SpoilerText from './spoiler-text';
import FancySeparator from './fancy-separator';
import QuoteText from './quote-text';
import { BalloonsTextSimple } from './balloons-text';
import { getAppDescription } from './frame-apps';

export const buildCustomElements = ({ preventReveal }) => [
    // Strikethrough
    { pattern: /~~(.*?)~~/g, parser: text => <s>{text}</s> },
    // Underline
    { pattern: /__(.*?)__/g, parser: text => <u>{text}</u> },
    // Italic
    { pattern: /\/\/(.*?)\/\//g, parser: text => <i>{text}</i> },
    // Bold
    { pattern: /\*\*(.*?)\*\*/g, parser: text => <b>{text}</b> },
    // Small
    { pattern: /-:(.*?):-/g, parser: text => <span className='text-[0.75em]'>{text}</span> },
    // Big
    {
        pattern: /\+:(.*?):\+/g,
        parser: text => <span className='text-[1.15em]'>{text}</span>,
    },
    // Shine
    {
        pattern: /\$\$(.*?)\$\$/g,
        parser: text => <span className='font-dosis font-extrabold text-violet-500'>{text}</span>,
    },
    // Spoiler
    {
        pattern: /\~\:(.*?)\:\~/g,
        parser: text => (
            <SpoilerText preventReveal={preventReveal} inPreview>
                {text}
            </SpoilerText>
        ),
    },
    // Love
    {
        pattern: /\%\%(.*?)\%\%/g,
        parser: text => <span className='font-lora font-extrabold text-red-500'>{text}</span>,
    },
    // Snow
    {
        pattern: /\$\@(.*?)\@\$/g,
        parser: text => (
            <>
                <div className='absolute inset-0 bg-sky-900 mix-blend-color rounded-lg' />
                <span className='font-playwrite font-extrabold text-sky-500'>{text}</span>
            </>
        ),
    },
    // Balloons
    {
        pattern: /ºº(.*?)ºº/g,
        parser: text => <BalloonsTextSimple>{text}</BalloonsTextSimple>,
    },
    // Breakline
    { pattern: /\|\|/g, parser: () => <br /> },
    // Separator with icon
    { pattern: /---\s?(.*?)\s?---/g, parser: icon => <FancySeparator icon={icon} /> },
    // Separator normal
    { pattern: /---/g, parser: () => <FancySeparator /> },
    // Bold and italic
    {
        pattern: /\*\/(.*?)\/\*/g,
        parser: text => (
            <b>
                <i>{text}</i>
            </b>
        ),
    },
    // Codeblock
    {
        pattern: /```(.*?)```/g,
        parser: text => (
            <pre className='block text-sm py-1 px-2 rounded-sm bg-slate-900 text-white'>{text}</pre>
        ),
    },
    // Code
    {
        pattern: /`(.*?)`/g,
        parser: text => (
            <code className='text-sm py-0.5 px-1 rounded-sm bg-pink-200 text-pink-600s'>
                {text}
            </code>
        ),
    },
    // Marked
    { pattern: /<mark>(.*?)<\/mark>/g, parser: text => <mark>{text}</mark> },
    // Quote
    {
        pattern: /<quote>(.*?)<\/quote>/g,
        parser: text => <QuoteText>{text}</QuoteText>,
    },
    // Quote with author
    {
        pattern: /<quote::(.*?)>(.*?)<\/quote>/g,
        parser: (author, text) => <QuoteText author={author}>{text}</QuoteText>,
    },
    // Random word
    {
        pattern: /<words::([^>]+)>/g,
        parser: match => {
            return (
                <span className='font-oswald font-bold text-indigo-700'>
                    {match.split('|').join(', ')}
                </span>
            );
        },
    },
    // Icon
    { pattern: /<icon::(.*?)>/g, parser: name => <Icon className='inline-block' name={name} /> },
    // External link
    {
        pattern: /<link::(.*?)>(.*?)<\/link>/g,
        parser: (url, label) => (
            <a className='font-bold underline text-rose-600' href={url} target='_blank'>
                {label}
            </a>
        ),
    },
    // Internal link
    {
        pattern: /<ilink::(.*?)>(.*?)<\/ilink>/g,
        parser: (url, label) => (
            <a className='font-bold underline text-rose-600' href={url}>
                {label}
            </a>
        ),
    },
    // Button link
    {
        pattern: /<blink::(.*?)>(.*?)<\/blink>/g,
        parser: (_, label) => (
            <Button
                className='block w-fit px-2 py-1 text-xs'
                type='button'
                onClick={ev => ev.preventDefault()}
            >
                {label}
            </Button>
        ),
    },
    // Internal Button link
    {
        pattern: /<blink::(.*?)>(.*?)<\/blink>/g,
        parser: (_, label) => (
            <Button
                className='block w-fit px-2 py-1 text-xs'
                type='button'
                onClick={ev => ev.preventDefault()}
            >
                {label}
            </Button>
        ),
    },
    // Button
    {
        pattern: /<button::(.*?)>(.*?)<\/button>/g,
        parser: (_, label) => {
            return (
                <button
                    className='inline-block px-2 py-1 -mt-4 bg-black font-sans text-white text-xs uppercase shadow-sm rounded-lg transition-all duration-150 -translate-y-0.5 active:translate-y-0'
                    type='button'
                >
                    {label}
                </button>
            );
        },
    },
    // Polaroid with description
    {
        pattern: /<polaroid::(.*?)>(.*?)<\/polaroid>/g,
        parser: (url, description) => (
            <div className='flex flex-row gap-4 items-start'>
                <img className='max-h-36 bg-white shadow-md rounded-md p-2' src={url} />
                <span className='bg-white shadow-md rounded-md p-2'>{description}</span>
            </div>
        ),
    },
    // Polaroid
    {
        pattern: /<polaroid::(.*?)>/g,
        parser: url => (
            <div className='flex flex-row gap-4 items-start'>
                <img className='max-h-36 bg-white shadow-md rounded-md p-2' src={url} />
            </div>
        ),
    },
    // Spotify Player
    {
        pattern: /<spotify::(.*?)>/g,
        parser: uri => <SpotifyPreview uri={uri} />,
    },
    // Sticker Full
    {
        pattern: /<sticker::(.*?)>/g,
        parser: id => <Sticker id={id} type='preview' />,
    },
    // Sticker Badge
    {
        pattern: /<badge::(.*?)>/g,
        parser: id => <Sticker id={id} type='preview' />,
    },
    // Sticker Inline
    {
        pattern: /\[\[(.*?)\]\]/g,
        parser: id => <Sticker id={id} />,
    },
    // Apps
    {
        pattern: /<app::(.*?)>/g,
        parser: name => (
            <div className='flex flex-row gap-2 bg-black text-white shadow-md rounded-md p-3 pr-4'>
                <div>
                    <Box />
                </div>
                <span className='font-noto mt-0.5 text-[1rem]'>{getAppDescription(name)}</span>
            </div>
        ),
    },
];

export default function GiftCardPreview({
    quote,
    code,
    hidden = false,
    preview = false,
    deleted = false,
    preventReveal = false,
}) {
    let quoteSettings = getRandomQuote();

    const customElements = buildCustomElements({ preventReveal });

    const [id] = code.split(':');
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

    return (
        <div
            className={cn(
                'relative overflow-hidden bg-gray-100 bg-center bg-[length:50%] p-2 rounded-md shadow-xl transition-all duration-150',
                {
                    'bg-none': configs?.bg,
                    'blur-sm select-none': hidden,
                    'blur-none md:blur-sm md:hover:blur-none ring-4 md:ring-0 ring-slate-300 ring-offset-4 md:ring-offset-0 opacity-60 md:opacity-100':
                        preview && hidden,
                    'ring-4 ring-red-600 ring-offset-4 opacity-60': deleted,
                },
            )}
            style={{ backgroundImage: configs?.bg ? '' : quoteSettings.bg }}
        >
            {configs?.bg && (
                <div className={cn('absolute z-0 inset-0 pointer-events-none', configs?.bg)} />
            )}

            <div
                className={cn(
                    'relative z-10 bg-gray-200 rounded-lg p-1 shadow-xl',
                    { 'bg-none': configs?.border },
                    configs?.border,
                )}
                style={{ background: configs?.border ? '' : quoteSettings.border }}
            >
                <div
                    className={cn(
                        'flex flex-row gap-2 items-start p-3 rounded',
                        quoteSettings.scheme,
                        configs?.scheme,
                        {
                            'text-white [text-shadow:_1px_1px_8px_rgb(0_0_0_/_30%)] bg-center bg-cover':
                                frame,
                            'text-black': dark,
                        },
                    )}
                    style={{
                        backgroundImage: `url(${frame})`,
                    }}
                >
                    <div className='absolute top-2 right-2 flex flex-row gap-1'>
                        {isFirstAppearance && (
                            <div className='fade-in flex items-center justify-center gap-2 w-4 h-4 bg-pink-600 rounded-full'>
                                <Asterisk size={16} className='text-white' />
                            </div>
                        )}
                    </div>

                    {!configs?.fullscreen && configs?.icon !== 'hidden' && (
                        <div>
                            <LucideIcon className='text-current' />
                        </div>
                    )}
                    <div className={cn('mt-[2px] font-delius font-medium pr-4')}>
                        <div
                            className={cn('block', {
                                'overflow-hidden line-clamp-4 mask-gradient': letter,
                            })}
                        >
                            <RichText elements={customElements}>{content}</RichText>
                        </div>

                        {greetings && greetings !== 'hidden' && (
                            <div className='mt-2 font-pacifico'>{greetings}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
