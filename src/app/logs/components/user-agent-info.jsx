'use client';

import { UAParser } from 'ua-parser-js';
import {
    LuGlobe as Globe,
    LuMonitor as Monitor,
    LuSmartphone as Smartphone,
    LuTablet as Tablet,
    LuServer as Server,
    LuBot as Bot,
    LuBolt as Node,
} from 'react-icons/lu';

import {
    DiApple as Apple,
    DiApple as Safari,
    DiAndroid as Android,
    DiFirefox as Firefox,
    DiLinux as Linux,
    DiChrome as Chrome,
    DiWindows as Windows,
} from 'react-icons/di';

export function UserAgentInfo({ userAgent }) {
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();
    const isBot = /bot|crawler|spider|crawling|unknown/i.test(userAgent);
    const isNode = /node/i.test(userAgent);

    const browserIcons = {
        chrome: <Chrome className='w-4 h-4 -mt-[2px]' />,
        firefox: <Firefox className='w-4 h-4 -mt-[2px]' />,
        safari: <Safari className='w-4 h-4 -mt-[2px]' />,
        default: <Globe className='w-4 h-4 -mt-[2px]' />,
    };

    const osIcons = {
        windows: <Windows className='w-4 h-4 -mt-[2px]' />,
        macos: <Apple className='w-4 h-4 -mt-[2px]' />,
        linux: <Linux className='w-4 h-4 -mt-[2px]' />,
        android: <Android className='w-4 h-4 -mt-[2px]' />,
        ios: <Apple className='w-4 h-4 -mt-[2px]' />,
        default: <Server className='w-4 h-4 -mt-[2px]' />,
    };

    const deviceIcons = {
        mobile: <Smartphone className='w-4 h-4 -mt-[2px]' />,
        tablet: <Tablet className='w-4 h-4 -mt-[2px]' />,
        desktop: <Monitor className='w-4 h-4 -mt-[2px]' />,
        default: <Server className='w-4 h-4 -mt-[2px]' />,
    };

    const getBrowserIcon = name =>
        browserIcons[
            name
                .replace(/mobile/i, '')
                .trim()
                .toLowerCase()
        ] || browserIcons.default;
    const getOSIcon = name => osIcons[name.toLowerCase()] || osIcons.default;
    const getDeviceIcon = type => deviceIcons[type.toLowerCase()] || deviceIcons.default;

    if (isBot) {
        return (
            <div className='inline-flex items-center space-x-2 text-sm bg-gray-100 rounded-full px-3 py-1'>
                <span className='flex items-center'>
                    <Bot className='w-4 h-4 mr-1' />
                    <span className='ml-1 max-w-xs truncate'>{userAgent}</span>
                </span>
            </div>
        );
    }

    if (isNode) {
        return (
            <div className='inline-flex items-center space-x-2 text-sm bg-gray-100 rounded-full px-3 py-1'>
                <span className='flex items-center'>
                    <Bot className='w-4 h-4 mr-1' />
                    <span className='ml-1 max-w-xs truncate'>NodeJS</span>
                </span>
            </div>
        );
    }

    return (
        <div className='inline-flex items-center space-x-2 text-sm bg-gray-100 rounded-full px-3 py-1'>
            <span className='flex items-center'>
                {getBrowserIcon(browser.name || '')}
                <span className='ml-1'>
                    {browser.name} {browser.version}
                </span>
            </span>
            <span className='flex items-center'>
                {getOSIcon(os.name || '')}
                <span className='ml-1'>
                    {os.name} {os.version}
                </span>
            </span>
            <span className='flex items-center'>
                {getDeviceIcon(device.type || 'desktop')}
                <span className='ml-1'>{device.model || 'Desktop'}</span>
            </span>
        </div>
    );
}
