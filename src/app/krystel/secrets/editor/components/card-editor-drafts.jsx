import { format, formatDistanceToNow } from 'date-fns';
import { Trash2, Save, Clock3 } from 'lucide-react';

import useDrafts from '@/modules/core/hooks/use-drafts';
import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';

import { Button } from '@/modules/shadcn/ui/button';
import { ScrollArea } from '@/modules/shadcn/ui/scroll-area';
import { Separator } from '@/modules/shadcn/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/modules/shadcn/ui/alert';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/modules/shadcn/ui/drawer';
import { cn } from '@/modules/core/helpers/utils';

export default function CardEditorDrafts({ open, setOpen, setContent }) {
    const { drafts, pickDraft, removeDraft, clearDrafts } = useDrafts('editor:drafts');

    const handleDiscard = (ev, id) => {
        removeDraft(id);
        ev.preventDefault();
        ev.stopPropagation();
    };

    const handleSelectDraft = id => {
        const draft = pickDraft(id);
        setContent(draft.content);
        setOpen(false);
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className='after:h-0!'>
                <div
                    className={cn(
                        'absolute top-[52px] left-1/2 transform -translate-1/2 z-100',
                        'w-[calc(100%-32px)] sm:max-w-[460px]',
                        'bg-white',
                    )}
                >
                    <DrawerHeader>
                        <DrawerTitle>Drafts</DrawerTitle>
                    </DrawerHeader>
                    <Separator className='shadow-lg' />
                </div>

                <ScrollArea className='relative h-auto overflow-scroll' type='always'>
                    <div className='mx-4 sm:mx-auto sm:w-full sm:max-w-[460px] mt-[68px] mb-16'>
                        <div>
                            {!Boolean(drafts.length) && (
                                <Alert>
                                    <Save className='size-4' />
                                    <AlertTitle>Empty</AlertTitle>
                                    <AlertDescription>
                                        No hay borradores guardados.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {Boolean(drafts.length) &&
                                drafts.map(draft => (
                                    <div
                                        key={`drat-item-${draft.id}`}
                                        className='w-full flex flex-col gap-1'
                                    >
                                        <GiftCardPreview
                                            className='border border-gray-200 shadow-none cursor-pointer mb-4 active:scale-95'
                                            classNames={{
                                                border: 'shadow-none',
                                            }}
                                            quote={draft.content}
                                            code='white'
                                            onClick={() => handleSelectDraft(draft.id)}
                                            preview
                                        />

                                        <div className='flex flex-row gap-2 items-center justify-between'>
                                            <div className='text-gray-500 flex gap-1 items-center text-xs'>
                                                <Clock3 size='0.85rem' />
                                                <span>
                                                    {format(
                                                        new Date(draft.created_at),
                                                        'MMM do, yyyy · h:mm aaa',
                                                    )}
                                                </span>
                                            </div>
                                            <button
                                                type='button'
                                                className='cursor-pointer bg-gray-200 text-gray-500 font-bold text-xs px-3 hover:scale-110 hover:bg-slate-300 hover:shadow-2xs active:scale-95 rounded-full h-5 inline-flex items-center justify-center transition-all'
                                                onClick={ev => handleDiscard(ev, draft.id)}
                                            >
                                                Descartar
                                            </button>
                                        </div>

                                        <Separator className='my-4' />
                                    </div>
                                ))}
                        </div>

                        <DrawerFooter className='px-0'>
                            <Button
                                type='button'
                                disabled={!drafts.length}
                                onClick={() => clearDrafts()}
                            >
                                <Trash2 /> Descartar todos
                            </Button>
                        </DrawerFooter>
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
