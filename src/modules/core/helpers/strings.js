import { camelCase } from 'lodash';

export const pascalCase = str => {
    const camel = camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
};
