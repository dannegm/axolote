'use client';
import {
    Save,
    Loader2,
    ChevronDown,
    X,
    RefreshCcw,
    Clipboard,
    Copy,
    ClipboardPlus,
} from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';

import { Button } from '@/modules/shadcn/ui/button';

export default function CardEditorActions({
    className,
    $translucedButton,
    isPending,
    canSave,
    expanded,
    pasteReplace,
    setExpanded,
    onForceUpdate,
    onReset,
    onSubmit,
    onPaste,
    onCopy,
}) {
    return (
        <div className={cn('flex flex-row gap-1 sm:gap-2', className)}>
            <div className='w-[36px] lg:hidden' ref={$translucedButton} />

            <Button
                className='lg:hidden'
                type='button'
                size='icon'
                onClick={() => setExpanded(!expanded)}
            >
                <ChevronDown
                    className={cn('transition-all duration-150', {
                        'rotate-180': !expanded,
                    })}
                />
            </Button>

            <Button type='button' size='icon' onClick={onForceUpdate}>
                <RefreshCcw />
            </Button>

            <Button type='button' size='icon' variant='secondary' onClick={onPaste}>
                {pasteReplace ? <Clipboard /> : <ClipboardPlus />}
            </Button>

            <Button type='button' size='icon' variant='secondary' onClick={onCopy}>
                <Copy />
            </Button>

            <div className='flex-1' />

            <Button
                type='button'
                size='icon'
                variant='destructive'
                disabled={!canSave}
                onClick={onReset}
            >
                <X
                    className={cn('transition-all duration-150', {
                        'rotate-180': !expanded,
                    })}
                />
            </Button>

            {isPending ? (
                <Button type='button' disabled>
                    <Loader2 className='animate-spin' />
                    <span className='hidden sm:block'> Guardando</span>
                </Button>
            ) : (
                <Button type='button' disabled={!canSave} onClick={onSubmit}>
                    <Save />
                    <span className='hidden sm:block'> Guardar</span>
                </Button>
            )}
        </div>
    );
}
