'use client';
import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shadcn/ui/popover';
import { Button } from '@/modules/shadcn/ui/button';
import { Input } from '@/modules/shadcn/ui/input';
import { cn } from '@/modules/shadcn/lib/utils';
import { icons } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/modules/shadcn/ui/tooltip';

const ICON_BUTTONS = Object.keys(icons).map(icon => ({
    icon: icon,
    alias: [],
}));

const IconPicker = ({
    ref,
    className,
    value,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    children,
    showIconName = false,
    searchable = true,
    searchPlaceholder = 'Search for an icon...',
    triggerPlaceholder = 'Select an icon',
    iconsList = ICON_BUTTONS,
    ...props
}) => {
    const [selectedIcon, setSelectedIcon] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(defaultOpen || false);

    const handleValueChange = icon => {
        if (value === undefined) {
            setSelectedIcon(icon);
        }
        onValueChange?.(icon);
    };

    const handleOpenChange = newOpen => {
        if (open === undefined) {
            setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    const [search, setSearch] = useState('');
    const [displayCount, setDisplayCount] = useState(36);

    const filteredIcons = useMemo(
        () =>
            search.trim() === ''
                ? iconsList
                : iconsList.filter(
                      ({ icon, alias }) =>
                          icon.toLowerCase().includes(search.toLowerCase().trim()) ||
                          (alias || []).some(alias =>
                              alias.toLowerCase().includes(search.toLowerCase().trim()),
                          ),
                  ),
        [search, iconsList],
    );

    useEffect(() => {
        setDisplayCount(36);
    }, [search]);

    const displayedIcons = useMemo(
        () => filteredIcons.slice(0, displayCount),
        [filteredIcons, displayCount],
    );

    const handleScroll = e => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop - clientHeight < 36) {
            setDisplayCount(prev => Math.min(prev + 36, filteredIcons.length));
        }
    };

    return (
        <Popover open={open ?? isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger ref={ref} asChild {...props}>
                {children || (
                    <Button variant='outline' className={className}>
                        {value || selectedIcon ? (
                            <>
                                <Icon name={value || selectedIcon} />
                                {showIconName && <span>{value || selectedIcon}</span>}
                            </>
                        ) : (
                            triggerPlaceholder
                        )}
                    </Button>
                )}
            </PopoverTrigger>
            <PopoverContent className='w-64 p-2'>
                {searchable && (
                    <Input
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className='mb-2'
                    />
                )}
                <div
                    className='grid grid-cols-4 gap-2 max-h-60 overflow-auto'
                    onScroll={handleScroll}
                >
                    {displayedIcons.map(({ icon }) => (
                        <TooltipProvider key={icon}>
                            <Tooltip>
                                <TooltipTrigger
                                    className={cn(
                                        'p-2 rounded-md border hover:bg-foreground/10 transition',
                                        'flex items-center justify-center',
                                    )}
                                    onClick={() => {
                                        handleValueChange(icon);
                                        setIsOpen(false);
                                        setDisplayCount(36);
                                        setSearch('');
                                    }}
                                >
                                    <Icon name={icon} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{icon}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                    {filteredIcons.length === 0 && (
                        <div className='text-center text-gray-500 col-span-4'>No icon found</div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};
IconPicker.displayName = 'IconPicker';

const Icon = ({ ref, name, ...props }) => {
    const LucideIcon = icons[name];
    return <LucideIcon ref={ref} {...props} />;
};
Icon.displayName = 'Icon';

export { IconPicker, Icon };
