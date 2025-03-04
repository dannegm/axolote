import { format, formatDistanceToNow } from 'date-fns';
import { Trash2, Save, Clock3 } from 'lucide-react';

import useDrafts from '@/modules/core/hooks/use-drafts';
import GiftCardPreview from '@/modules/krystel/components/common/gift-card-preview';

import { Button } from '@/modules/shadcn/ui/button';
import { Separator } from '@/modules/shadcn/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/modules/shadcn/ui/alert';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/modules/shadcn/ui/drawer';

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
            <DrawerContent className='overflow-y-auto after:h-0!'>
                <div className='mx-4 sm:mx-auto sm:w-full sm:max-w-[460px] mb-16'>
                    <DrawerHeader className='sticky top-0 z-100 bg-white'>
                        <DrawerTitle>Drafts</DrawerTitle>
                    </DrawerHeader>
                    <Separator className='sticky top-[56px] z-100 mb-4 shadow-lg' />

                    <div>
                        {!Boolean(drafts.length) && (
                            <Alert>
                                <Save className='size-4' />
                                <AlertTitle>Empty</AlertTitle>
                                <AlertDescription>No hay borradores guardados.</AlertDescription>
                            </Alert>
                        )}

                        {Boolean(drafts.length) &&
                            drafts.map(draft => (
                                <div
                                    key={`drat-item-${draft.id}`}
                                    className='w-full flex flex-col gap-1'
                                >
                                    <GiftCardPreview
                                        className='border border-gray-200 shadow-none active:scale-95 cursor-pointer mb-4 text-base'
                                        classNames={{
                                            border: 'shadow-none',
                                        }}
                                        quote={draft.content}
                                        code='white'
                                        onClick={() => handleSelectDraft(draft.id)}
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
            </DrawerContent>
        </Drawer>
    );
}
