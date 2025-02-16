'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/modules/core/helpers/utils';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';

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
    const [showLogs] = useLocalStorage('settings:show_logs', false);

    const navItems = [
        { name: 'Tools', href: '/krystel/secrets/tools' },
        { name: 'Editor', href: '/krystel/secrets/editor' },
        { name: 'Cards', href: '/krystel/secrets/cards' },
    ];

    if (showLogs) {
        navItems.unshift({ name: 'Logs', href: '/krystel/secrets/logs' });
    }

    return (
        <nav
            className={cn(
                'sticky top-4 z-[100] flex flex-row gap-1 p-2 bg-black text-white rounded-md',
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
    );
}
