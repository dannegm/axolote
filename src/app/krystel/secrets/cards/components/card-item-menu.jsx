import { Delete, Ellipsis, Trash2, Undo2 } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';

import { isDeleted } from '@/modules/krystel/helpers/utils';

import useDeleteQuoteAction from '@/modules/krystel/hooks/use-delete-quote-action';
import useDestroyQuoteAction from '@/modules/krystel/hooks/use-destroy-quote-action';
import useRestoreQuoteAction from '@/modules/krystel/hooks/use-restore-quote-action';

import { Button } from '@/modules/shadcn/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/modules/shadcn/ui/dropdown-menu';

export default function CardItemMenu({ className, item }) {
    const deleted = isDeleted(item);

    const deleteQuote = useDeleteQuoteAction();
    const destroyQuote = useDestroyQuoteAction();
    const restoreQuote = useRestoreQuoteAction();

    const handleDelete = () => {
        deleteQuote.mutate({ quoteId: item.id });
    };

    const handleDestroy = () => {
        destroyQuote.mutate({ quoteId: item.id });
    };

    const handleRestore = () => {
        restoreQuote.mutate({ quoteId: item.id });
    };

    return (
        <div className={cn(className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='size-6' variant='outline' size='icon'>
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-56 z-[70]' align='end'>
                    <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {deleted ? (
                        <DropdownMenuItem onSelect={handleRestore}>
                            <Undo2 /> Restore
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onSelect={handleDelete}>
                            <Delete /> Delete
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem onSelect={handleDestroy}>
                        <Trash2 /> Destroy
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
