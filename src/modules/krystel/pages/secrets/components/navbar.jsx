import { useEffect } from 'react';
import { Link } from 'wouter';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';

import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';

const useClientEvents = () => {
    const { discover } = useEasterEggs();

    useEffect(() => {
        discover('matrix');
    }, []);
};

const NavLink = ({ className, href, children }) => {
    return (
        <Link
            className={active =>
                cn(
                    'px-3 py-1 rounded-sm font-bold text-sm uppercase transition-all duration-150 cursor-pointer',
                    'hover:bg-white hover:text-black',
                    'active:scale-95',
                    { 'bg-white text-black': active },
                    className,
                )
            }
            href={href}
        >
            {children}
        </Link>
    );
};

export default function Navbar({ classNames }) {
    const [showLogs] = useSettings('settings:logs:show', false);

    useClientEvents();

    const navItems = [];

    navItems.push({ name: 'Cards', href: '/krys/secrets/cards' });
    navItems.push({ name: 'Tools', href: '/krys/secrets/tools' });

    if (showLogs) {
        navItems.push({ name: 'Logs', href: '/krys/secrets/logs' });
    }

    navItems.push({ name: 'Settings', href: '/krys/secrets/settings' });

    return (
        <nav
            className={cn(
                'sticky top-4 z-100 flex flex-row gap-1 p-2 bg-black text-white rounded-md ring-1 ring-white',
                classNames?.container,
            )}
        >
            {navItems.map(item => (
                <NavLink key={item.href} className={classNames?.item} href={item.href}>
                    {item.name}
                </NavLink>
            ))}
        </nav>
    );
}
