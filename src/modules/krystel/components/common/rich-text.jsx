import React from 'react';

import LoveText from './love-text';
import ShineText from './shine-text';
import SpoilerText from './spoiler-text';
import Sticker from './sticker';
import Polaroid from './polaroid';
import SpotifyPlayer from './spotify-player';
import SnowText from './snow-text';
import RandomWord from './random-word';
import BalloonsText from './balloons-text';

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
    { pattern: /---(.*?)---/g, parser: text => <span className='text-[0.75em]'>{text}</span> },
    // Big
    {
        pattern: /\+\+\+(.*?)\+\+\+/g,
        parser: text => <span className='text-[1.25em]'>{text}</span>,
    },
    // Marked
    { pattern: /::(.*?)::/g, parser: text => <mark>{text}</mark> },
    // Shine
    { pattern: /\$\$(.*?)\$\$/g, parser: text => <ShineText>{text}</ShineText> },
    // Spoiler
    { pattern: /\~\:(.*?)\:\~/g, parser: text => <SpoilerText>{text}</SpoilerText> },
    // Love
    { pattern: /\%\%(.*?)\%\%/g, parser: text => <LoveText>{text}</LoveText> },
    // Snow
    { pattern: /\$\@(.*?)\@\$/g, parser: text => <SnowText>{text}</SnowText> },
    // Balloons
    { pattern: /\º\º(.*?)\º\º/g, parser: text => <BalloonsText>{text}</BalloonsText> },
    // Random word
    {
        pattern: /<<([^>]+)>>/g,
        parser: match => <RandomWord words={match.split('|')} />,
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

    {
        pattern: /<\[polaroid\|(.*?)\|(.*?)\]>/g,
        parser: (url, description) => <Polaroid url={url} description={description} />,
    },
    {
        pattern: /<\[polaroid\|(.*?)\]>/g,
        parser: url => <Polaroid url={url} />,
    },
    // Spotify Player
    {
        pattern: /https?:\/\/open\.spotify\.com\/[^\s]+/g,
        parser: uri => <SpotifyPlayer uri={uri} />,
    },
    // Sticker Full
    {
        pattern: /\[\[\[\[(.*?)\]\]\]\]/g,
        parser: id => <Sticker id={id} type='full' />,
    },
    // Sticker Badge
    {
        pattern: /\[\[\[(.*?)\]\]\]/g,
        parser: id => <Sticker id={id} type='badge' />,
    },
    // Sticker Inline
    {
        pattern: /\[\[(.*?)\]\]/g,
        parser: id => <Sticker id={id} />,
    },
];

export const stripedElements = [
    { pattern: /~~(.*?)~~/g, parser: text => text },
    { pattern: /__(.*?)__/g, parser: text => text },
    { pattern: /\/\/(.*?)\/\//g, parser: text => text },
    { pattern: /\*\*(.*?)\*\*/g, parser: text => text },
    { pattern: /---(.*?)---/g, parser: text => text },
    { pattern: /\+\+\+(.*?)\+\+\+/g, parser: text => text },
    { pattern: /::(.*?)::/g, parser: text => text },
    { pattern: /\$\$(.*?)\$\$/g, parser: text => text },
    { pattern: /\~\:(.*?)\:\~/g, parser: text => text },
    { pattern: /\%\%(.*?)\%\%/g, parser: text => text },
    { pattern: /\$\@(.*?)\@\$/g, parser: text => text },
    { pattern: /\º\º(.*?)\º\º/g, parser: text => text },
    { pattern: /<<([^>]+)>>/g, parser: match => match.split('|').join(', ') },
    { pattern: /\|\|/g, parser: () => ' ¬ ' },
    { pattern: /\*\/(.*?)\/\*/g, parser: text => text },
    { pattern: /`(.*?)`/g, parser: text => text },
    { pattern: /\{\{(.*?)\|(.*?)\}\}/g, parser: (_, description) => `[${description}]` },
    { pattern: /\{\{(.*?)\}\}/g, parser: url => `[${url}]` },
    { pattern: /<\[polaroid\|(.*?)\|(.*?)\]>/g, parser: (_, description) => `[${description}]` },
    { pattern: /<\[polaroid\|(.*?)\]>/g, parser: url => `[${url}]` },
    { pattern: /\[\[\[\[(.*?)\]\]\]\]/g, parser: id => `[${id}]` },
    { pattern: /\[\[\[(.*?)\]\]\]/g, parser: id => `[${id}]` },
    { pattern: /\[\[(.*?)\]\]/g, parser: id => `[${id}]` },
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
