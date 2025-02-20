import React from 'react';

import { pascalCase } from '@/modules/core/helpers/strings';
import { extractConfigs } from '@/modules/krystel/helpers/strings';

import Icon from './icon';
import LoveText from './love-text';
import ShineText from './shine-text';
import SpoilerText from './spoiler-text';
import Sticker from './sticker';
import Polaroid from './polaroid';
import SpotifyPlayer from './spotify-player';
import SnowText from './snow-text';
import RandomWord from './random-word';
import FancySeparator from './fancy-separator';
import QuoteText from './quote-text';
import BalloonsText from './balloons-text';
import FrameApps from './frame-apps';
import Button from './button';

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
            <pre className='block text-xs py-1 px-2 rounded-sm bg-slate-900 text-white'>{text}</pre>
        ),
    },
    // Code
    {
        pattern: /`(.*?)`/g,
        parser: text => (
            <code className='text-xs py-0.5 px-1 rounded-sm bg-pink-200 text-pink-600'>{text}</code>
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
    // Button
    {
        pattern: /<button::(.*?)>(.*?)<\/button>/g,
        parser: (action, label) => {
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
    { pattern: /\|\|/g, parser: () => ' ¬ ' },
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
    { pattern: /<button::(.*?)>(.*?)<\/button>/g, parser: (_, label) => `[${label}]` },
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

export const parseText = (text, elements) => {
    const unescapedText = text.replace(/\\([*~_/:\[\]$])/g, (_, char) => `\0${char}`);

    const processSegment = (segment, remainingElements) => {
        if (typeof segment !== 'string' || remainingElements.length === 0) return segment;

        const [{ pattern, parser }, ...rest] = remainingElements;
        const parts = [];
        let match;
        let lastIndex = 0;

        while ((match = pattern.exec(segment)) !== null) {
            parts.push(segment.slice(lastIndex, match.index));
            const [matcher, ...params] = match;
            parts.push(parser(...params, matcher));
            lastIndex = pattern.lastIndex;
        }

        parts.push(segment.slice(lastIndex));
        return parts.flatMap(part => processSegment(part, rest));
    };

    let parsedElements = processSegment(unescapedText, elements);

    return parsedElements.map(segment =>
        typeof segment === 'string' ? segment.replace(/\0([*~_/:\[\]$])/g, '$1') : segment,
    );
};

export default function RichText({ children, elements = defaultElements }) {
    return parseText(children, elements).map((element, index) => (
        <React.Fragment key={index}>{element}</React.Fragment>
    ));
}
