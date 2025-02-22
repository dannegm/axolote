import Simple from '../apps/simple';
import Valentine from '../apps/valentine';
import WouldYouRather from '../apps/would-you-rather';
import EasterEggs from '../apps/easter-eggs';

const appsComponents = {
    default: () => <></>,
    valentine: Valentine,
    wyr: WouldYouRather,
    simple: Simple,
    easter_eggs: EasterEggs,
};

const appsDescriptions = {
    default: 'App not found',
    valentine: '¿Quieres ser mi san valentín?',
    wyr: '¿Qué prefieres?',
    simple: 'Ejemplo simple',
    easter_eggs: 'Easter Eggs',
};

export const getAppDescription = name => {
    return appsDescriptions[name] || appsDescriptions.default;
};

export const getAppComponent = name => {
    return appsComponents[name] || appsComponents.default;
};

export default function FrameApps({ name, input, props = {} }) {
    const Component = getAppComponent(name);
    return <Component input={input} {...props} />;
}
