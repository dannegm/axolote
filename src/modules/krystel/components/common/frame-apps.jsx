import Valentine from '../apps/valentine';

const apps = {
    default: <></>,
    valentine: <Valentine />,
};

const appsDescriptions = {
    default: 'App not found',
    valentine: '¿Quieres ser mi san valentín?',
};

export const getAppDescription = name => {
    return appsDescriptions[name] || appsDescriptions.default;
};

export default function FrameApps({ name }) {
    return apps[name] || apps.default;
}
