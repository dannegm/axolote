import { trim } from 'lodash';

export const replaceWithLongestSentence = text => {
    const regex = /<words::([^>]+)>/g;
    const match = regex.exec(text);

    if (match) {
        const options = match[1].split('|');
        const longestSentence = options.reduce(
            (longest, current) => (current.length > longest.length ? current : longest),
            '',
        );
        return text.replace(match[0], longestSentence);
    }

    return text;
};

export const extractConfigs = (configsText = null) => {
    if (!configsText) return null;

    return configsText
        .trim()
        .split('|')
        .map(i => i.trim())
        .reduce((a, c) => {
            const [key, ...value] = c.split(':');
            a[key] = value.join(':') !== '' ? value.join(':') : true;
            return a;
        }, {});
};

export const extractConfigsAndContent = (text = '') => {
    const regex = /^\(\{(.*?)\}\)/;
    const match = text.match(regex);

    if (match) {
        const configs = extractConfigs(match[1]);
        const content = trim(text.slice(match[0].length), '||').trim();
        return {
            configs,
            content,
        };
    }

    return {
        configs: null,
        content: text,
    };
};
