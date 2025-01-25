'use client';

import { cn } from '@/modules/core/helpers/utils';
import CopyText from '@/modules/krystel/components/common/copy-text';
import { BookMarked, Ellipsis, MessageSquareQuote, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

const MenuItem = ({ href, children }) => {
    return (
        <a
            className='flex flex-col items-center gap-1 font-sans text-xs w-20 py-2 rounded-lg hover:bg-gray-200 active:bg-slate-300 transition-all'
            href={href}
        >
            {children}
        </a>
    );
};

const MenuContent = ({ className, code }) => {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className='flex flex-row items-center justify-evenly'>
                <MenuItem href='/krystel'>
                    <RefreshCcw />
                    Another
                </MenuItem>
                <MenuItem href='/krystel/cards'>
                    <BookMarked />
                    Cards
                </MenuItem>
                <MenuItem href='/krystel/posts'>
                    <MessageSquareQuote />
                    Posts
                </MenuItem>
            </div>

            {code && (
                <div className='flex justify-center'>
                    <CopyText content={`https://axolote.me/krystel?code=${code}`}>{code}</CopyText>
                </div>
            )}
        </div>
    );
};

export default function Menu({ code }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && (
                <div
                    className='fixed z-max inset-0 cursor-pointer bg-black backdrop-blur-md end-opacity-[0.3] fade-in-custom'
                    onClick={() => setOpen(false)}
                />
            )}
            <div
                className='fixed inset-x-0 bottom-0 z-max flex justify-center cursor-pointer'
                onClick={() => setOpen(false)}
            >
                <div
                    className='flex flex-col items-center bg-white rounded-t-lg cursor-default shadow-[0px_-3px_16px_4px_rgba(0,_0,_0,_0.1)]'
                    onClick={ev => ev.stopPropagation()}
                >
                    <button
                        className='flex flex-none w-24 h-10 items-center justify-center overflow-hidden cursor-pointer'
                        onClick={() => setOpen(state => !state)}
                    >
                        <Ellipsis size='2rem' strokeWidth='2px' />
                    </button>

                    <MenuContent
                        className={cn('w-24 h-0 p-0 transition-all duration-150 interpolate-size opacity-0', {
                            'w-80 h-auto pb-2 opacity-100': open,
                        })}
                        code={code}
                    />
                </div>
            </div>
        </>
    );
}
