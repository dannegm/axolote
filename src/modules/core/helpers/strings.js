import { camelCase, capitalize, snakeCase } from 'lodash';

export const pascalCase = str => {
    const camel = camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
};

export const capCase = str => {
    const snake = snakeCase(str).split('_');
    return snake.map(word => capitalize(word)).join(' ');
};
