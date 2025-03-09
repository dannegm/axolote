'use client';
import { Fragment } from 'react';
import { capitalize } from 'lodash';
import { ArrowLeftToLine, ArrowRightToLine, Bolt, Delete, Eye, EyeOff, Undo2 } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { groupBy } from '@/modules/core/helpers/arrays';
import useSettingsList from '@/modules/core/hooks/use-settings-list';
import useSettings from '@/modules/core/hooks/use-settings';

import { isFoolsDay, isWomenDay } from '@/modules/krystel/helpers/dates';
import { isDeleted } from '@/modules/krystel/helpers/utils';
import useDeleteQuoteAction from '@/modules/krystel/hooks/use-delete-quote-action';
import useRestoreQuoteAction from '@/modules/krystel/hooks/use-restore-quote-action';
import useToggleQuoteAction from '@/modules/krystel/hooks/use-toggle-quote-action';

import { Button } from '@/modules/shadcn/ui/button';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuItemWrapper,
    DropdownMenuItemDescription,
    DropdownMenuItemSlot,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/modules/shadcn/ui/dropdown-menu';

const settingsList = {
    // Admin
    'settings:show_secrets': {
        key: 'settings:show_secrets',
        label: 'Secrets',
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
        label: 'Breakpoint Indicator',
        defaultValue: false,
        group: 'development',
    },
    'settings:cards:ignore_conditional_quotes': {
        key: 'settings:cards:ignore_conditional_quotes',
        label: 'Ingore Conditional Quotes',
        defaultValue: false,
        group: 'development',
    },
};

export default function CardViewerMenu({ className, item }) {
    //* Base Settings
    const [hasAdmin] = useSettings('settings:show_secrets', false);
    const [hasDev] = useSettings('settings:show_quick_settings', false);

    //* General Settings
    const [actionsDirection, setActionDirection] = useSettings('viewer:actions_direction', 'ltr');

    const [skipWomenDay, setSkipWomenDay] = useSettings('specials:skip_women_day', false);
    const [skipFoolsDay, setSkipFoolsDay] = useSettings('specials:skip_fools_day', false);

    //* Admin Settings
    const initialSettings = Object.values(settingsList).reduce((acc, { key, defaultValue }) => {
        acc[key] = defaultValue;
        return acc;
    }, {});
    const { settings, update } = useSettingsList(initialSettings);

    const filteredSettingsList = Object.values(settingsList).filter(i => {
        if (!hasAdmin && i.group === 'admin') {
            return false;
        }
        if (!hasAdmin && i.group === 'development') {
            return false;
        }
        if (!hasDev && i.group === 'development') {
            return false;
        }

        return true;
    });
    const settingsGroup = groupBy(filteredSettingsList, item => item.group);

    //* Setup

    const align = actionsDirection === 'ltr' ? 'end' : 'start';
    const deleted = isDeleted(item);
    const show = item?.show;

    const deleteQuote = useDeleteQuoteAction();
    const restoreQuote = useRestoreQuoteAction();
    const toggleQuote = useToggleQuoteAction();

    const foolsDay = isFoolsDay();
    const womenDay = isWomenDay();

    //* Handlers

    const handleDelete = () => {
        deleteQuote.mutate({ quoteId: item.id });
    };

    const handleRestore = () => {
        restoreQuote.mutate({ quoteId: item.id });
    };

    const handleToggle = () => {
        toggleQuote.mutate({ quoteId: item.id, show: !item?.show });
    };

    const handleActionDirectionSelect = () => {
        const newDirection = actionsDirection === 'rtl' ? 'ltr' : 'rtl';
        setActionDirection(newDirection);
    };

    return (
        <div className={cn(className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                        <Bolt />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-56 z-[70]' align={align}>
                    <DropdownMenuLabel>General</DropdownMenuLabel>

                    <DropdownMenuItem direction='col' onSelect={handleActionDirectionSelect}>
                        <DropdownMenuItemWrapper>
                            {actionsDirection === 'rtl' ? (
                                <DropdownMenuItemSlot>
                                    <ArrowLeftToLine /> RTL
                                </DropdownMenuItemSlot>
                            ) : (
                                <DropdownMenuItemSlot>
                                    <ArrowRightToLine /> LTR
                                </DropdownMenuItemSlot>
                            )}
                        </DropdownMenuItemWrapper>
                        <DropdownMenuItemDescription>
                            Intercambia la dirección de los botones.
                        </DropdownMenuItemDescription>
                    </DropdownMenuItem>

                    {womenDay && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={skipWomenDay}
                                onCheckedChange={setSkipWomenDay}
                            >
                                <span>
                                    Desactivar{' '}
                                    <span className='font-semibold text-purple-500'>#WomenDay</span>
                                </span>
                            </DropdownMenuCheckboxItem>
                        </>
                    )}

                    {foolsDay && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={skipFoolsDay}
                                onCheckedChange={setSkipFoolsDay}
                            >
                                <span>
                                    Desactivar{' '}
                                    <span className='font-semibold text-orange-500'>#FoolsDay</span>
                                </span>
                            </DropdownMenuCheckboxItem>
                        </>
                    )}

                    {Object.entries(settingsGroup).map(([group, items]) => (
                        <Fragment key={`settings-group-${group}`}>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>{capitalize(group)}</DropdownMenuLabel>
                            {items.map(({ key, label }) => (
                                <DropdownMenuCheckboxItem
                                    key={key}
                                    checked={settings[key]}
                                    onCheckedChange={value => update(key, value)}
                                >
                                    {label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </Fragment>
                    ))}

                    {hasAdmin && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Card Actions</DropdownMenuLabel>

                            {deleted ? (
                                <DropdownMenuItem onSelect={handleRestore}>
                                    <Undo2 /> Restore
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onSelect={handleDelete}>
                                    <Delete /> Delete
                                </DropdownMenuItem>
                            )}

                            {show ? (
                                <DropdownMenuItem onSelect={handleToggle}>
                                    <EyeOff /> Hide
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onSelect={handleToggle}>
                                    <Eye /> Show
                                </DropdownMenuItem>
                            )}
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
