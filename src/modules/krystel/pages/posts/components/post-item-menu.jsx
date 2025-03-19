import { Delete, Ellipsis, Trash2 } from 'lucide-react';

import useDeletePostAction from '@/modules/krystel/hooks/use-delete-post-action';
import useDestroyPostAction from '@/modules/krystel/hooks/use-destroy-post-action';

import { cn } from '@/modules/core/helpers/utils';
import { Button } from '@/modules/shadcn/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/modules/shadcn/ui/dropdown-menu';

export default function PostItemMenu({ className, item }) {
    const deletePost = useDeletePostAction();
    const destroyPost = useDestroyPostAction();

    const handleDelete = () => {
        deletePost(item.id);
    };

    const handleDestroy = () => {
        destroyPost(item.id);
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
                    <DropdownMenuLabel>Post Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled={item.deleted_at} onSelect={handleDelete}>
                        <Delete /> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleDestroy}>
                        <Trash2 /> Destroy
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
