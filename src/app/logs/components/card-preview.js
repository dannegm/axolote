import RichText from '@/components/krystel/rich-text';
import { cn } from '@/helpers/utils';
import { getRandomQuote, quoteFromSettings } from '@/services/quotes';
import { icons } from 'lucide-react';

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
        parser: text => <span class='font-extrabold text-violet-500'>{text}</span>,
    },
    // Spoiler
    {
        pattern: /\~\:(.*?)\:\~/g,
        parser: text => <span class='font-extrabold text-fuchsia-500'>{text}</span>,
    },
    // Love
    {
        pattern: /\%\%(.*?)\%\%/g,
        parser: text => <span class='font-extrabold text-red-500'>{text}</span>,
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
        parser: (url, description) => <Polaroid url={url} description={description} />,
    },
    {
        pattern: /\{\{(.*?)\}\}/g,
        parser: url => <Polaroid url={url} />,
    },
    // Spotify Player
    {
        pattern: /\#\#(.*?)\#\#/g,
        parser: uri => <SpotifyPlayer uri={uri} />,
    },
    // Sticker Full
    {
        pattern: /\[\[\[\[(.*?)\]\]\]\]/g,
        parser: id => <Sticker id={id} />,
    },
    // Sticker Badge
    {
        pattern: /\[\[\[(.*?)\]\]\]/g,
        parser: id => <Sticker id={id} />,
    },
    // Sticker Inline
    {
        pattern: /\[\[(.*?)\]\]/g,
        parser: id => <Sticker id={id} />,
    },
];

export default function CardPreview({ quote, code }) {
    let quoteSettings = getRandomQuote();

    if (code) {
        const [, ...settings] = code.split(':');
        quoteSettings = quoteFromSettings(settings.join(':'));
    }

    const LucideIcon = icons[quoteSettings.icon];

    return (
        <div
            className='bg-gray-100 bg-center bg-[length:50%] p-2 rounded-md  shadow-xl'
            style={{ backgroundImage: quoteSettings.bg }}
        >
            <div
                className='bg-gray-200 rounded-lg p-1 shadow-xl'
                style={{ background: quoteSettings.border }}
            >
                <div
                    className={cn(
                        'flex flex-row gap-2 items-start p-3 rounded',
                        quoteSettings.scheme,
                    )}
                >
                    <div>
                        <LucideIcon className='text-current' />
                    </div>
                    <div className='mt-[2px] font-delius font-medium'>
                        <RichText elements={customElements}>{quote}</RichText>
                    </div>
                </div>
            </div>
        </div>
    );
}
