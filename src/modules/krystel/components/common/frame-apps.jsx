import Valentine from '../apps/valentine';

const apps = {
    default: <></>,
    valentine: <Valentine />,
};

export default function FrameApps({ name }) {
    return apps[name] || apps.default;
}
