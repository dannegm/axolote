'use client';
import { cn } from '@/modules/core/helpers/utils';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';

import { Label } from '@/modules/shadcn/ui/label';
import { Switch } from '@/modules/shadcn/ui/switch';

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
    const [showSecrets, setShowSecrets] = useLocalStorage('settings:show_secrets', false);
    const [showLogs, setShowLogs] = useLocalStorage('settings:show_logs', false);
    const [showQuickSettings, setShowQuickSettings] = useLocalStorage(
        'settings:show_quick_settings',
        false,
    );

    const [skipActions, setSkipActions] = useLocalStorage('settings:skip_actions', false);
    const [debugMode, setDebugMode] = useLocalStorage('settings:debug_mode', false);

    const [includesFuture, setIncludesFuture] = useLocalStorage(
        'settings:cards:includes_future',
        false,
    );
    const [includesDeleted, setIncludesDeleted] = useLocalStorage(
        'settings:cards:includes_deleted',
        false,
    );

    const [enablePostsSection, setEnablePostsSection] = useLocalStorage(
        'settings:posts:enable',
        false,
    );
    const [includesDeletedPosts, setIncludesDeletedPosts] = useLocalStorage(
        'settings:posts:includes_deleted',
        false,
    );

    return (
        <>
            <h2 className='font-bold text-xl mt-4'>Settings</h2>
            <div className={cn('flex flex-col gap-2')}>
                <SwitchOption
                    id='settings:show_secrets'
                    label='Show Secrets'
                    checked={showSecrets}
                    onCheckedChange={() => setShowSecrets(!showSecrets)}
                />
                <SwitchOption
                    id='settings:show_logs'
                    label='Show Logs'
                    checked={showLogs}
                    onCheckedChange={() => setShowLogs(!showLogs)}
                />
                <SwitchOption
                    id='settings:show_quick_settings'
                    label='Show Quick Settings'
                    checked={showQuickSettings}
                    onCheckedChange={() => setShowQuickSettings(!showQuickSettings)}
                />

                <SwitchOption
                    id='settings:skip_actions'
                    label='Skip Actions'
                    checked={skipActions}
                    onCheckedChange={() => setSkipActions(!skipActions)}
                />

                <SwitchOption
                    id='settings:debug_mode'
                    label='Debug Mode'
                    checked={debugMode}
                    onCheckedChange={() => setDebugMode(!debugMode)}
                />
                <SwitchOption
                    id='settings:cards:includes_future'
                    label='Includes Future Cards'
                    checked={includesFuture}
                    onCheckedChange={() => setIncludesFuture(!includesFuture)}
                />
                <SwitchOption
                    id='settings:cards:includes_deleted'
                    label='Includes Deleted Cards'
                    checked={includesDeleted}
                    onCheckedChange={() => setIncludesDeleted(!includesDeleted)}
                />
                <SwitchOption
                    id='settings:posts:enable'
                    label='Enable Posts Section'
                    checked={enablePostsSection}
                    onCheckedChange={() => setEnablePostsSection(!enablePostsSection)}
                />
                <SwitchOption
                    id='settings:posts:includes_deleted'
                    label='Includes Deleted Posts'
                    checked={includesDeletedPosts}
                    onCheckedChange={() => setIncludesDeletedPosts(!includesDeletedPosts)}
                />
            </div>
        </>
    );
}
