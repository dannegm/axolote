'use client';
import { cn } from '@/modules/core/helpers/utils';
import useSettingsList from '@/modules/core/hooks/use-settings-list';

import { Label } from '@/modules/shadcn/ui/label';
import { Switch } from '@/modules/shadcn/ui/switch';

const settingsList = {
    'settings:show_secrets': {
        key: 'settings:show_secrets',
        label: 'Show Secrets',
        defaultValue: false,
    },
    'settings:show_logs': {
        key: 'settings:show_logs',
        label: 'Show Logs',
        defaultValue: false,
    },
    'settings:show_quick_settings': {
        key: 'settings:show_quick_settings',
        label: 'Show Quick Settings',
        defaultValue: false,
    },
    'settings:skip_actions': {
        key: 'settings:skip_actions',
        label: 'Skip Actions',
        defaultValue: false,
    },
    'settings:debug_mode': {
        key: 'settings:debug_mode',
        label: 'Debug Mode',
        defaultValue: false,
    },
    'settings:show_breakpoint_indicator': {
        key: 'settings:show_breakpoint_indicator',
        label: 'Show Breakpoint Indicator',
        defaultValue: false,
    },
    'settings:cards:includes_future': {
        key: 'settings:cards:includes_future',
        label: 'Includes Future Cards',
        defaultValue: false,
    },
    'settings:cards:includes_deleted': {
        key: 'settings:cards:includes_deleted',
        label: 'Includes Deleted Cards',
        defaultValue: false,
    },
    'settings:posts:includes_deleted': {
        key: 'settings:posts:includes_deleted',
        label: 'Includes Deleted Posts',
        defaultValue: false,
    },
};

const SwitchOption = ({ id, label, checked, onCheckedChange }) => {
    return (
        <div className={cn('flex flex-col gap-2 bg-gray-200 px-4 py-2 rounded-md mt-2')}>
            <div className='flex flex-row justify-between items-center'>
                <Label htmlFor={id}>{label}</Label>
                <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
            </div>
        </div>
    );
};

export default function Settings() {
    const initialSettings = Object.values(settingsList).reduce((acc, { key, defaultValue }) => {
        acc[key] = defaultValue;
        return acc;
    }, {});

    const { settings, update } = useSettingsList(initialSettings);

    return (
        <>
            <h2 className='font-bold text-xl mt-4'>Settings</h2>
            <div className={cn('flex flex-col gap-2')}>
                {Object.values(settingsList).map(({ key, label }) => (
                    <SwitchOption
                        key={key}
                        id={key}
                        label={label}
                        checked={settings[key]}
                        onCheckedChange={value => update(key, value)}
                    />
                ))}
            </div>
        </>
    );
}
