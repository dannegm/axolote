'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';
import ClientOnly from '@/modules/core/components/common/client-only';

import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';

const ClientEvents = () => {
    const { discover } = useEasterEggs();

    useEffect(() => {
        discover('matrix');
    }, []);

    return <></>;
};

const NavLink = ({ className, href, active, children }) => {
    return (
        <Link
            className={cn(
                'px-3 py-1 rounded-sm font-bold text-sm uppercase transition-all duration-150 cursor-pointer',
                'hover:bg-white hover:text-black',
                'active:scale-95',
                { 'bg-white text-black': active },
                className,
            )}
            href={href}
        >
            {children}
        </Link>
    );
};

export default function Navbar({ classNames }) {
    const pathname = usePathname();
    const [showLogs] = useSettings('settings:logs:show', false);

    const navItems = [];

    navItems.push({ name: 'Cards', href: '/krystel/secrets/cards' });
    navItems.push({ name: 'Tools', href: '/krystel/secrets/tools' });

    if (showLogs) {
        navItems.push({ name: 'Logs', href: '/krystel/secrets/logs' });
    }

    navItems.push({ name: 'Settings', href: '/krystel/secrets/settings' });

    return (
        <ClientOnly>
            <ClientEvents />
            <nav
                className={cn(
                    'sticky top-4 z-100 flex flex-row gap-1 p-2 bg-black text-white rounded-md',
                    classNames?.container,
                )}
            >
                {navItems.map(item => (
                    <NavLink
                        key={item.href}
                        className={classNames?.item}
                        active={pathname === item.href}
                        href={item.href}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </ClientOnly>
    );
}
