'use client';
import { capitalize } from 'lodash';
import { cn } from '@/modules/core/helpers/utils';
import { groupBy } from '@/modules/core/helpers/arrays';
import useSettingsList from '@/modules/core/hooks/use-settings-list';

import { Label } from '@/modules/shadcn/ui/label';
import { Switch } from '@/modules/shadcn/ui/switch';

const settingsList = {
    // Admin
    'settings:show_secrets': {
        key: 'settings:show_secrets',
        label: 'Show Secrets',
        defaultValue: false,
        group: 'admin',
    },
    'settings:show_quick_settings': {
        key: 'settings:show_quick_settings',
        label: 'Show Quick Settings',
        defaultValue: false,
        group: 'admin',
    },
    'settings:logs:show': {
        key: 'settings:logs:show',
        label: 'Show Logs',
        defaultValue: false,
        group: 'admin',
    },
    'settings:logs:realtime': {
        key: 'settings:logs:realtime',
        label: 'Realtime Logs',
        defaultValue: false,
        group: 'admin',
    },

    // Development
    'settings:skip_actions': {
        key: 'settings:skip_actions',
        label: 'Skip Actions',
        defaultValue: false,
        group: 'development',
    },
    'settings:debug_mode': {
        key: 'settings:debug_mode',
        label: 'Debug Mode',
        defaultValue: false,
        group: 'development',
    },
    'settings:show_breakpoint_indicator': {
        key: 'settings:show_breakpoint_indicator',
        label: 'Show Breakpoint Indicator',
        defaultValue: false,
        group: 'development',
    },

    // Cards
    'settings:cards:ignore_conditional_quotes': {
        key: 'settings:cards:ignore_conditional_quotes',
        label: 'Ignore Conditional Quotes',
        defaultValue: false,
        group: 'cards',
    },
    'settings:cards:includes_future': {
        key: 'settings:cards:includes_future',
        label: 'Includes Future Cards',
        defaultValue: false,
        group: 'cards',
    },
    'settings:cards:includes_deleted': {
        key: 'settings:cards:includes_deleted',
        label: 'Includes Deleted Cards',
        defaultValue: false,
        group: 'cards',
    },

    // Posts
    'settings:posts:indev': {
        key: 'settings:posts:indev',
        label: 'Post In Development',
        defaultValue: false,
        group: 'posts',
    },
    'settings:posts:includes_indev': {
        key: 'settings:posts:includes_indev',
        label: 'Includes InDev Posts',
        defaultValue: false,
        group: 'posts',
    },
    'settings:posts:includes_deleted': {
        key: 'settings:posts:includes_deleted',
        label: 'Includes Deleted Posts',
        defaultValue: false,
        group: 'posts',
    },
};

const SwitchOption = ({ id, label, checked, onCheckedChange }) => {
    return (
        <div className='flex flex-row justify-between items-center bg-gray-200 px-3 py-2 rounded-sm'>
            <Label htmlFor={id}>{label}</Label>
            <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
        </div>
    );
};

export default function Settings() {
    const initialSettings = Object.values(settingsList).reduce((acc, { key, defaultValue }) => {
        acc[key] = defaultValue;
        return acc;
    }, {});

    const { settings, update } = useSettingsList(initialSettings);

    const settingsGroup = groupBy(Object.values(settingsList), item => item.group);

    return (
        <>
            <h2 className='font-bold text-2xl'>Settings</h2>

            <div className={cn('flex flex-col gap-4 mb-4')}>
                {Object.entries(settingsGroup).map(([group, items]) => (
                    <div key={`settings-group-${group}`} className={cn('flex flex-col gap-2')}>
                        <h3 className='font-bold text-base mt-4'>{capitalize(group)}</h3>
                        <div className={cn('flex flex-col gap-1')}>
                            {items.map(({ key, label }) => (
                                <SwitchOption
                                    key={key}
                                    id={key}
                                    label={label}
                                    checked={settings[key]}
                                    onCheckedChange={value => update(key, value)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
