'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';

import { Label } from '@/modules/shadcn/ui/label';
import { Switch } from '@/modules/shadcn/ui/switch';
import useSettingsList from '@/modules/core/hooks/use-settings-list';

const settingsList = {
    'settings:skip_actions': {
        key: 'settings:skip_actions',
        label: 'Skip Actions',
        defaultValue: false,
        path: '/krystel/secrets',
    },
    'settings:logs:realtime': {
        key: 'settings:logs:realtime',
        label: 'Realtime Logs',
        defaultValue: false,
        path: '/krystel/secrets/logs',
    },
};

const SwitchOption = ({ id, label, checked, onCheckedChange }) => {
    return (
        <div className='flex-1 flex flex-row justify-between items-center bg-gray-200 px-3 py-2 rounded-md'>
            <Label htmlFor={id}>{label}</Label>
            <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
        </div>
    );
};

export default function QuickSettings({ classNames }) {
    const pathname = usePathname();
    const [showQuickSettings] = useSettings('settings:show_quick_settings', false);

    const initialSettings = Object.values(settingsList).reduce((acc, { key, defaultValue }) => {
        acc[key] = defaultValue;
        return acc;
    }, {});

    const { settings, update } = useSettingsList(initialSettings);
    const settingsItems = Object.values(settingsList).filter(item => pathname.includes(item.path));

    if (!showQuickSettings) return null;

    return (
        <div className={cn('flex flex-row gap-1 mt-2', classNames?.container)}>
            {settingsItems.map(({ key, label }) => (
                <SwitchOption
                    key={key}
                    id={key}
                    label={label}
                    checked={settings[key]}
                    onCheckedChange={value => update(key, value)}
                />
            ))}
        </div>
    );
}
