'use client';
import { icons, Asterisk } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { getRandomQuote, quoteFromSettings } from '@/modules/krystel/services/quotes';
import { extractConfigsAndContent } from '@/modules/krystel/helpers/strings';

import RichText from './rich-text';
import Sticker from './sticker';
import SpotifyPreview from './spotify-preview';
import { useFirstAppearanceAnom } from '../../hooks/use-first-appearance';

export const customElements = [
    // Strikethrough
    { pattern: /~~(.*?)~~/g, parser: text => <s>{text}</s> },
    // Underline
    { pattern: /__(.*?)__/g, parser: text => <u>{text}</u> },
    // Italic
    { pattern: /\/\/(.*?)\/\//g, parser: text => <i>{text}</i> },
    // Bold
    { pattern: /\*\*(.*?)\*\*/g, parser: text => <b>{text}</b> },
    // Marked
    { pattern: /::(.*?)::/g, parser: text => <mark>{text}</mark> },
    // Shine
    {
        pattern: /\$\$(.*?)\$\$/g,
        parser: text => <span className='font-dosis font-extrabold text-violet-500'>{text}</span>,
    },
    // Spoiler
    {
        pattern: /\~\:(.*?)\:\~/g,
        parser: text => (
            <span className='font-quicksand font-extrabold text-fuchsia-500'>{text}</span>
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
    // Multiple
    {
        pattern: /<<([^>]+)>>/g,
        parser: match => {
            return (
                <span className='font-oswald font-bold text-indigo-700'>
                    {match.split('|').join(', ')}
                </span>
            );
        },
    },
    // Breakline
    { pattern: /\|\|/g, parser: () => <br /> },
    // Bold and italic
    {
        pattern: /\*\/(.*?)\/\*/g,
        parser: text => (
            <b>
                <i>{text}</i>
            </b>
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
    // Polaroid
    {
        pattern: /\{\{(.*?)\|(.*?)\}\}/g,
        parser: (url, description) => (
            <div className='flex flex-row gap-4 items-start'>
                <img className='max-h-36 bg-white shadow-md rounded-md p-2' src={url} />
                <span className='bg-white shadow-md rounded-md p-2'>{description}</span>
            </div>
        ),
    },
    {
        pattern: /\{\{(.*?)\}\}/g,
        parser: url => (
            <div className='flex flex-row gap-4 items-start'>
                <img className='max-h-36 bg-white shadow-md rounded-md p-2' src={url} />
            </div>
        ),
    },
    // Spotify Player
    {
        pattern: /https?:\/\/open\.spotify\.com\/[^\s]+/g,
        parser: uri => <SpotifyPreview uri={uri} />,
    },
    // Sticker Full
    {
        pattern: /\[\[\[\[(.*?)\]\]\]\]/g,
        parser: id => <Sticker id={id} type='preview' />,
    },
    // Sticker Badge
    {
        pattern: /\[\[\[(.*?)\]\]\]/g,
        parser: id => <Sticker id={id} type='preview' />,
    },
    // Sticker Inline
    {
        pattern: /\[\[(.*?)\]\]/g,
        parser: id => <Sticker id={id} />,
    },
];

export default function GiftCardPreview({ quote, code }) {
    let quoteSettings = getRandomQuote();

    const [id] = code.split(':');
    const isFirstAppearance = useFirstAppearanceAnom(id);

    if (code) {
        const [, ...settings] = code.split(':');
        quoteSettings = quoteFromSettings(settings.join(':'));
    }

    const { configs, content } = extractConfigsAndContent(quote);
    const greetings = configs?.greetings || '';
    const LucideIcon =
        configs?.icon === 'hidden' ? <></> : icons[configs?.icon || quoteSettings.icon];

    return (
        <div
            className={cn(
                'relative overflow-hidden bg-gray-100 bg-center bg-[length:50%] p-2 rounded-md shadow-xl',
                {
                    'bg-none': configs?.bg,
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
                    )}
                >
                    {isFirstAppearance && (
                        <div className='fade-in absolute top-2 right-2 flex items-center justify-center w-4 h-4 bg-pink-600 rounded-full'>
                            <Asterisk size={16} className='text-white' />
                        </div>
                    )}

                    {!configs?.fullscreen && configs?.icon !== 'hidden' && (
                        <div>
                            <LucideIcon className='text-current' />
                        </div>
                    )}
                    <div className='mt-[2px] font-delius font-medium'>
                        <RichText elements={customElements}>{content}</RichText>

                        {greetings && <div className='mt-2 font-pacifico'>Saludos.</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
