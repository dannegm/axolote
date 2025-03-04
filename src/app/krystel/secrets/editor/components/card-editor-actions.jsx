'use client';
import { Save, Loader2, ChevronDown, RefreshCcw, Trash2 } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';

import { Button } from '@/modules/shadcn/ui/button';

export default function CardEditorActions({
    className,
    $translucedButton,
    isPending,
    canSave,
    expanded,
    setExpanded,
    onForceUpdate,
    onReset,
    onSubmit,
    onDraft,
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

            <div className='flex-1' />

            <Button
                type='button'
                size='icon'
                variant='secondary'
                disabled={!canSave}
                onClick={onReset}
            >
                <Trash2
                    className={cn('transition-all duration-150', {
                        'rotate-180': !expanded,
                    })}
                />
            </Button>

            <Button type='button' variant='secondary' disabled={!canSave} onClick={onDraft}>
                <Save />
                <span className='hidden sm:block'> Borrador</span>
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
