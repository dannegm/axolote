import { merge, trim } from 'lodash';

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

export const buildConfigs = (configs = {}, trimmed = false) => {
    if (!configs) return '';
    if (!Object.entries(configs).length) return '';
    const results = Object.entries(configs)
        .filter(([key, value]) => value)
        .filter(([key, value]) => value !== 'default')
        .filter(([key, value]) => value !== 'random')
        .map(([key, value]) => {
            if (typeof value === 'boolean' && value) {
                return `${key}`;
            }
            if (typeof value === 'boolean' && !value) {
                return '';
            }
            return `${key}:${value}`;
        })
        .join('|');

    if (!results) return '';
    if (trimmed) return results;
    return `({${results}})`;
};

export const extractConfigs = (configsText = null) => {
    if (!configsText) return null;

    const regex = /^\(\{(.*?)\}\)/;
    if (regex.test(configsText)) {
        configsText = configsText.match(regex)[1];
    }

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
        const configsRaw = buildConfigs(configs);
        const content = trim(text.slice(match[0].length), '\n').trim();
        return {
            configsRaw,
            configs,
            content,
        };
    }

    return {
        configsRaw: '',
        configs: null,
        content: text,
    };
};

export const mergeConfigs = (source, text) => {
    const { configs, content } = extractConfigsAndContent(text);
    const sourceCondifs = extractConfigs(source);

    const mergedConfigs = merge(sourceCondifs, configs);
    const preparedConfids = buildConfigs(mergedConfigs);

    return `${preparedConfids} ${content}`;
};
