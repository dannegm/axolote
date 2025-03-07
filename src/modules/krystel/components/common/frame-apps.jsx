import {
    Award,
    Box,
    Diamond,
    Gamepad2,
    HandHeart,
    HeartPulse,
    Image,
    MessageSquareHeart,
    PenTool,
    Proportions,
    Split,
} from 'lucide-react';

import Simple from '../apps/simple';
import Valentine from '../apps/valentine';
import WouldYouRather from '../apps/would-you-rather';
import EasterEggs from '../apps/easter-eggs';
import Breakpoint from '../apps/breakpoint';
import FlappyBird from '../apps/flappy-bird';
import PostSimple from '../apps/post-simple';
import PostMood from '../apps/post-mood';
import PostDrawing from '../apps/post-drawing';
import PostImage from '../apps/post-image';

const appsComponents = {
    default: () => <></>,
    valentine: Valentine,
    wyr: WouldYouRather,
    simple: Simple,
    easter_eggs: EasterEggs,
    breakpoint: Breakpoint,
    flappybird: FlappyBird,

    // Posts
    'post-simple': PostSimple,
    'post-mood': PostMood,
    'post-drawing': PostDrawing,
    'post-image': PostImage,
};

const appsDescriptions = {
    default: 'App not found',
    valentine: '¿Quieres ser mi san valentín?',
    wyr: '¿Qué prefieres?',
    simple: 'Ejemplo simple',
    easter_eggs: 'Encuéntralos todos',
    breakpoint: 'Breakpoint',
    flappybird: 'Flappy Bird',

    // Posts
    'post-simple': 'Cuéntame qué estás pensando',
    'post-mood': 'Dime cómo te sientes',
    'post-drawing': 'Dibuja algo divertido',
    'post-image': 'Comparte una imagen',
};

const appsIcons = {
    default: Box,
    valentine: HeartPulse,
    wyr: Split,
    simple: Diamond,
    easter_eggs: Award,
    breakpoint: Proportions,
    flappybird: Gamepad2,

    // Posts
    'post-simple': MessageSquareHeart,
    'post-mood': HandHeart,
    'post-drawing': PenTool,
    'post-image': Image,
};

export const getAppDescription = name => {
    return appsDescriptions[name] || appsDescriptions.default;
};

export const getAppComponent = name => {
    return appsComponents[name] || appsComponents.default;
};

export const getAppIcon = name => {
    return appsIcons[name] || appsIcons.default;
};
export default function FrameApps({ name, input, props = {} }) {
    const Component = getAppComponent(name);
    return <Component input={input} {...props} />;
}
