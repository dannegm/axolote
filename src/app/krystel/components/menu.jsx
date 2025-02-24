'use client';

import { useQueryState, parseAsBoolean } from 'nuqs';
import Link from 'next/link';
import { ArrowDown, BookMarked, Ellipsis, MessageSquareQuote, RefreshCcw } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import ClientOnly from '@/modules/core/components/common/client-only';

const MenuItem = ({ as = 'link', primary, href, label, demo, children }) => {
    const elements = {
        a: 'a',
        button: 'button',
        link: Link,
    };

    const Component = elements[as] || elements['link'];

    return (
        <Component className={cn('block w-24')} href={href}>
            {demo && (
                <div className='absolute -translate-y-[4rem] fade-in-custom flex flex-col items-center gap-2 w-24 text-center'>
                    <span className='px-2 py-1 bg-black text-white text-sm font-noto rounded-full drop-shadow'>
                        {label}
                    </span>
                    <ArrowDown className='animate-bounce drop-shadow' strokeWidth={2} />
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
    const [showSecrets] = useLocalStorage('settings:show_secrets', false);
    const [demo] = useQueryState('menu-demo');

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className='flex flex-row items-center justify-evenly'>
                <MenuItem href='/krystel/cards' label='Cards' demo={demo === 'cards'}>
                    <BookMarked />
                </MenuItem>
                <MenuItem as='a' href='/krystel' label='Another' demo={demo === 'another'} primary>
                    <RefreshCcw />
                </MenuItem>
                <MenuItem href='/krystel/posts' label='Posts' demo={demo === 'posts'}>
                    <MessageSquareQuote />
                </MenuItem>
            </div>

            {showSecrets && (
                <div className='flex justify-center'>
                    <Link
                        className='px-3 py-1 bg-black text-white font-pacifico rounded-lg transition-all duration-150 hover:scale-105 active:scale-95'
                        href='/krystel/secrets/tools'
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
        <ClientOnly>
            {open && (
                <div
                    className='fixed z-max inset-0 cursor-pointer bg-black backdrop-blur-md end-opacity-[0.3] fade-in-custom'
                    onClick={closeMenu}
                />
            )}
            <div
                className='fixed inset-x-0 bottom-0 z-max flex justify-center cursor-pointer'
                onClick={closeMenu}
            >
                <div
                    className='flex flex-col items-center bg-white rounded-t-lg cursor-default shadow-[0px_-3px_16px_4px_rgba(0,_0,_0,_0.1)]'
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
                            'w-24 h-0 p-0 transition-all duration-150 interpolate-size opacity-0',
                            {
                                'w-80 h-auto pb-2 opacity-100': open,
                            },
                        )}
                    />
                </div>
            </div>
        </ClientOnly>
    );
}
