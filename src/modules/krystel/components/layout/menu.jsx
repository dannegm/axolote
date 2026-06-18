import { Link } from '@tanstack/react-router';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { ArrowDown, BookMarked, Ellipsis, MessageSquareQuote, RefreshCcw } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';

const MenuItem = ({ as = 'link', primary, href, label, demo, children }) => {
    const elements = {
        a: 'a',
        button: 'button',
        link: Link,
    };

    const Component = elements[as] || elements['link'];
    const linkProps = as === 'a' ? { href } : { to: href };

    return (
        <Component className={cn('block w-24')} {...linkProps}>
            {demo && (
                <div
                    className={cn(
                        'animate-in fade-in-0 duration-300 ease-in',
                        'absolute -translate-y-16 flex flex-col items-center gap-2 w-24 text-center',
                    )}
                >
                    <span className='px-2 py-1 bg-black text-white text-sm font-noto rounded-full drop-shadow-xs'>
                        {label}
                    </span>
                    <ArrowDown className='animate-bounce drop-shadow-xs' strokeWidth={2} />
                </div>
            )}
            <div
                className={cn(
                    'flex flex-col items-center gap-1 font-sans text-xs w-full py-3 rounded-full hover:bg-gray-200 active:bg-slate-300 transition-all',
                    {
                        'bg-purple-600 text-white hover:bg-purple-800 active:bg-purple-950':
                            primary,
                        'bg-cyan-300 animate-pulse': demo,
                        'bg-purple-600': demo && primary,
                    },
                )}
            >
                {children}
            </div>
        </Component>
    );
};

const MenuContent = ({ className }) => {
    const [showSecrets] = useSettings('settings:show_secrets', false);
    const [demo] = useQueryState('menu-demo');

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className='flex flex-row items-center justify-evenly'>
                <MenuItem href='/krys/cards' label='Cards' demo={demo === 'cards'}>
                    <BookMarked />
                </MenuItem>
                <MenuItem as='a' href='/krys' label='Another' demo={demo === 'another'} primary>
                    <RefreshCcw />
                </MenuItem>
                <MenuItem href='/krys/posts' label='Posts' demo={demo === 'posts'}>
                    <MessageSquareQuote />
                </MenuItem>
            </div>

            {showSecrets && (
                <div className='flex justify-center'>
                    <Link
                        className='px-3 py-1 bg-black text-white font-pacifico rounded-lg transition-all duration-150 hover:scale-105 active:scale-95'
                        to='/krys/secrets'
                    >
                        Secrets.
                    </Link>
                </div>
            )}
        </div>
    );
};

export default function Menu() {
    const [open, setOpen] = useQueryState('menu', parseAsBoolean.withDefault(false));
    const [demo, setDemo] = useQueryState('menu-demo');

    const toggleMenu = () => {
        setOpen(state => !state);
    };

    const closeMenu = () => {
        setOpen(false);
        setDemo(null);
    };

    return (
        <>
            {open && (
                <div
                    className={cn(
                        'animate-in fade-in-0 duration-300 ease-in opacity-30',
                        'fixed z-max inset-0 cursor-pointer bg-black backdrop-blur-md',
                    )}
                    onClick={closeMenu}
                />
            )}

            <div
                className='fixed inset-x-0 bottom-0 z-max pointer-events-none'
                onClick={closeMenu}
            >
                <div
                    className={cn(
                        'absolute left-1/2 -translate-x-1/2 bottom-2',
                        'flex flex-col items-center overflow-hidden',
                        'bg-white rounded-lg cursor-default pointer-events-auto',
                        'shadow-[0px_-3px_16px_4px_rgba(0,0,0,0.1)]',
                        'transition-all duration-150 interpolate-size',
                        'w-24',
                        { 'w-80': open },
                    )}
                    onClick={ev => ev.stopPropagation()}
                >
                    <button
                        className={cn(
                            'flex flex-none w-24 h-10 items-center justify-center overflow-hidden cursor-pointer',
                            {
                                'opacity-20': demo === 'another',
                            },
                        )}
                        onClick={toggleMenu}
                    >
                        <Ellipsis size='2rem' strokeWidth='2px' />
                    </button>

                    <MenuContent
                        className={cn(
                            'h-0 p-0 transition-all duration-150 interpolate-size opacity-0',
                            {
                                'h-auto pb-2 opacity-100': open,
                            },
                        )}
                    />
                </div>
            </div>
        </>
    );
}
