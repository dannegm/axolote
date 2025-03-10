import { Box } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';
import { pascalCase } from '@/modules/core/helpers/strings';
import { extractConfigs } from '@/modules/krystel/helpers/strings';

import Icon from '@/modules/krystel/components/common/icon';
import LoveText from '@/modules/krystel/components/common/love-text';
import ShineText from '@/modules/krystel/components/common/shine-text';
import SpoilerText from '@/modules/krystel/components/common/spoiler-text';
import Sticker from '@/modules/krystel/components/common/sticker';
import Polaroid from '@/modules/krystel/components/common/polaroid';
import SpotifyPlayer from '@/modules/krystel/components/common/spotify-player';
import SpotifyPreview from '@/modules/krystel/components/common/spotify-preview';
import SnowText from '@/modules/krystel/components/common/snow-text';
import RandomWord, { RandomWorldPreview } from '@/modules/krystel/components/common/random-word';
import FancySeparator from '@/modules/krystel/components/common/fancy-separator';
import QuoteText from '@/modules/krystel/components/common/quote-text';
import BalloonsText from '@/modules/krystel/components/common/balloons-text';
import Button from '@/modules/krystel/components/common/button';

import { BalloonsTextSimple } from '@/modules/krystel/components/common/balloons-text';
import FrameApps, {
    getAppDescription,
    getAppIcon,
} from '@/modules/krystel/components/common/frame-apps';
import ButtonActions from '../components/common/button-actions';

export const defaultElements = [
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
    { pattern: /\+:(.*?):\+/g, parser: text => <span className='text-[1.25em]'>{text}</span> },
    // Shine
    { pattern: /\$\$(.*?)\$\$/g, parser: text => <ShineText>{text}</ShineText> },
    // Spoiler
    { pattern: /\~\:(.*?)\:\~/g, parser: text => <SpoilerText>{text}</SpoilerText> },
    // Love
    { pattern: /\%\%(.*?)\%\%/g, parser: text => <LoveText>{text}</LoveText> },
    // Snow
    { pattern: /\$\@(.*?)\@\$/g, parser: text => <SnowText>{text}</SnowText> },
    // Balloons
    { pattern: /ºº(.*?)ºº/g, parser: text => <BalloonsText>{text}</BalloonsText> },
    // Breakline
    { pattern: /\n/g, parser: () => <br /> },
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
            <pre className='block text-xs py-1 px-2 rounded-xs bg-slate-900 text-white'>{text}</pre>
        ),
    },
    // Code
    {
        pattern: /`(.*?)`/g,
        parser: text => (
            <code className='text-xs py-0.5 px-1 rounded-xs bg-pink-200 text-pink-600'>{text}</code>
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
    { pattern: /<words::([^>]+)>/g, parser: match => <RandomWord words={match.split('|')} /> },
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
        parser: (url, label) => (
            <Button as='a' className='block w-fit mx-auto text-sm' href={url} target='_blank'>
                {label}
            </Button>
        ),
    },
    // Internal Button link
    {
        pattern: /<iblink::(.*?)>(.*?)<\/iblink>/g,
        parser: (url, label) => (
            <Button as='a' className='block w-fit mx-auto text-sm' href={url}>
                {label}
            </Button>
        ),
    },
    // Polaroid with description
    {
        pattern: /<polaroid::(.*?)>(.*?)<\/polaroid>/g,
        parser: (url, description) => <Polaroid url={url} description={description} />,
    },
    // Polaroid
    {
        pattern: /<polaroid::(.*?)>/g,
        parser: url => <Polaroid url={url} />,
    },
    // Spotify Player
    {
        pattern: /<spotify::(.*?)>/g,
        parser: uri => <SpotifyPlayer uri={uri} />,
    },
    // Sticker Full
    {
        pattern: /<sticker::(.*?)>/g,
        parser: id => <Sticker id={id} type='full' />,
    },
    // Sticker Badge
    {
        pattern: /<badge::(.*?)>/g,
        parser: id => <Sticker id={id} type='badge' />,
    },
    // Sticker Inline
    {
        pattern: /\[\[(.*?)\]\]/g,
        parser: id => <Sticker id={id} />,
    },
    // Button Actions with props
    {
        pattern: /<button::(.*?)\(\{(.*?)\}\)>(.*?)<\/button>/g,
        parser: (action, args, label) => {
            const props = extractConfigs(args);
            return (
                <ButtonActions className='mx-auto' action={action} props={props} label={label} />
            );
        },
    },
    // Button Actions with input
    {
        pattern: /<button::(.*?)\((.*?)\)>(.*?)<\/button>/g,
        parser: (action, input, label) => {
            return (
                <ButtonActions className='mx-auto' action={action} input={input} label={label} />
            );
        },
    },
    // Button Actions
    {
        pattern: /<button::(.*?)>(.*?)<\/button>/g,
        parser: (action, label) => (
            <ButtonActions className='mx-auto' action={action} label={label} />
        ),
    },
    // Apps with props
    {
        pattern: /<app::(.*?)\(\{(.*?)\}\)>/g,
        parser: (name, args) => {
            const props = extractConfigs(args);
            return <FrameApps name={name} props={props} />;
        },
    },
    // Apps with input
    {
        pattern: /<app::(.*?)\((.*?)\)>/g,
        parser: (name, input) => {
            return <FrameApps name={name} input={input} />;
        },
    },
    // Apps
    {
        pattern: /<app::(.*?)>/g,
        parser: name => <FrameApps name={name} />,
    },
];

export const buildPreviewElements = ({ preventReveal }) => [
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
    { pattern: /\n/g, parser: () => <br /> },
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
            <pre className='block text-sm py-1 px-2 rounded-xs bg-slate-900 text-white'>{text}</pre>
        ),
    },
    // Code
    {
        pattern: /`(.*?)`/g,
        parser: text => (
            <code className='text-sm py-0.5 px-1 rounded-xs bg-pink-200 text-pink-600s'>
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
            return <RandomWorldPreview words={match.split('|')} />;
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
        pattern: /<iblink::(.*?)>(.*?)<\/iblink>/g,
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
    // Button Actions with props
    {
        pattern: /<button::(.*?)\(\{(.*?)\}\)>(.*?)<\/button>/g,
        parser: (action, args, label) => (
            <ButtonActions className='block w-fit px-2 py-1 text-xs' label={label} />
        ),
    },
    // Button Actions with input
    {
        pattern: /<button::(.*?)\((.*?)\)>(.*?)<\/button>/g,
        parser: (action, input, label) => (
            <ButtonActions className='block w-fit px-2 py-1 text-xs' label={label} />
        ),
    },
    // Button Actions
    {
        pattern: /<button::(.*?)>(.*?)<\/button>/g,
        parser: (action, label) => (
            <ButtonActions className='block w-fit px-2 py-1 text-xs' label={label} />
        ),
    },
    // Apps with props
    {
        pattern: /<app::(.*?)\(\{(.*?)\}\)>/g,
        parser: (name, args) => {
            const props = extractConfigs(args);
            const Icon = getAppIcon(name);
            return (
                <div className='flex flex-row gap-2 bg-black text-white shadow-md rounded-md p-3 pr-4'>
                    <div>
                        <Icon />
                    </div>
                    <div className='flex flex-col gap-1 font-noto mt-0.5 text-[1rem]'>
                        <span>{getAppDescription(name)}</span>
                        <ul className='text-gray-300'>
                            {Object.entries(props).map(([key, value], index) => {
                                if (key.startsWith('_')) return null;
                                return (
                                    <li
                                        key={`apps::props::${key}::${value}::${index}`}
                                        className='text-xs'
                                    >
                                        <span className='font-bold'>{key}:</span>{' '}
                                        <span>{value}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            );
        },
    },
    // Apps with input
    {
        pattern: /<app::(.*?)\((.*?)\)>/g,
        parser: (name, input) => {
            const Icon = getAppIcon(name);
            return (
                <div className='flex flex-row gap-2 bg-black text-white shadow-md rounded-md p-3 pr-4'>
                    <div>
                        <Icon />
                    </div>
                    <div className='flex flex-col gap-1 font-noto mt-0.5 text-[1rem]'>
                        <span>{getAppDescription(name)}</span>
                        {!input.startsWith('_') && (
                            <span className='text-xs text-gray-300'>{input}</span>
                        )}
                    </div>
                </div>
            );
        },
    },
    // Apps
    {
        pattern: /<app::(.*?)>/g,
        parser: name => {
            const Icon = getAppIcon(name);
            return (
                <div
                    className={cn(
                        'flex flex-row gap-2 bg-black text-white shadow-md rounded-md p-3 pr-4',
                    )}
                >
                    <div>
                        <Icon />
                    </div>
                    <span className={cn('font-noto mt-0.5 text-[1rem]')}>
                        {getAppDescription(name)}
                    </span>
                </div>
            );
        },
    },
];

export const stripedElements = [
    { pattern: /~~(.*?)~~/g, parser: text => text },
    { pattern: /__(.*?)__/g, parser: text => text },
    { pattern: /\/\/(.*?)\/\//g, parser: text => text },
    { pattern: /\*\*(.*?)\*\*/g, parser: text => text },
    { pattern: /-:(.*?):-/g, parser: text => text },
    { pattern: /\+:(.*?):\+/g, parser: text => text },
    { pattern: /\$\$(.*?)\$\$/g, parser: text => text },
    { pattern: /\~\:(.*?)\:\~/g, parser: text => text },
    { pattern: /\%\%(.*?)\%\%/g, parser: text => text },
    { pattern: /\$\@(.*?)\@\$/g, parser: text => text },
    { pattern: /\ºº(.*?)ºº/g, parser: text => text },
    { pattern: /\n/g, parser: () => ' ¬ ' },
    { pattern: /---\s?(.*?)\s?---/g, parser: icon => `\n-- [${icon}] --\n` },
    { pattern: /---/g, parser: () => '\n---\n' },
    { pattern: /\*\/(.*?)\/\*/g, parser: text => text },
    { pattern: /`(.*?)`/g, parser: text => `\n\`\`\`${text}\`\`\`\n` },
    { pattern: /`(.*?)`/g, parser: text => `\`${text}\`` },
    { pattern: /<mark>(.*?)<\/mark>/g, parser: text => text },
    { pattern: /<quote>(.*?)<\/quote>/g, parser: text => `\n> ${text}\n` },
    {
        pattern: /<quote::(.*?)>(.*?)<\/quote>/g,
        parser: (author, text) => `\n> ${text}\n>${author}\n`,
    },
    { pattern: /<words::([^>]+)>/g, parser: match => match.split('|').join(', ') },
    { pattern: /<icon::(.*?)>/g, parser: name => `[${name}]` },
    { pattern: /<link::(.*?)>(.*?)<\/link>/g, parser: (url, label) => `[${label}](${url})` },
    { pattern: /<ilink::(.*?)>(.*?)<\/ilink>/g, parser: (url, label) => `[${label}](${url})` },
    { pattern: /<blink::(.*?)>(.*?)<\/blink>/g, parser: (url, label) => `[${label}](${url})` },
    { pattern: /<iblink::(.*?)>(.*?)<\/iblink>/g, parser: (url, label) => `[${label}](${url})` },
    {
        pattern: /<polaroid::(.*?)>(.*?)<\/polaroid>/g,
        parser: (url, description) => `![${description}](${url})`,
    },
    { pattern: /<polaroid::(.*?)>/g, parser: url => `!(${url})` },
    { pattern: /<spotify::(.*?)>/g, parser: uri => uri },
    { pattern: /<sticker::(.*?)>/g, parser: id => `[${id}]` },
    { pattern: /<badge::(.*?)>/g, parser: id => `[${id}]` },
    { pattern: /\[\[(.*?)\]\]/g, parser: id => `[${id}]` },
    {
        pattern: /<button::(.*?)\(\{(.*?)\}\)>(.*?)<\/button>/g,
        parser: (_, __, label) => `[${label}]`,
    },
    { pattern: /<button::(.*?)\((.*?)\)>(.*?)<\/button>/g, parser: (_, __, label) => `[${label}]` },
    { pattern: /<button::(.*?)>(.*?)<\/button>/g, parser: (_, label) => `[${label}]` },
    {
        pattern: /<app::(.*?)\(\{(.*?)\}\)>/g,
        parser: (name, args) => {
            const props = extractConfigs(args);
            return `<${pascalCase(name)} props={${JSON.stringify(props)}} />`;
        },
    },
    {
        pattern: /<app::(.*?)\((.*?)\)>/g,
        parser: (name, input) => `<${pascalCase(name)} input="${input}" />`,
    },
    { pattern: /<app::(.*?)>/g, parser: name => `<${pascalCase(name)} />` },
];
