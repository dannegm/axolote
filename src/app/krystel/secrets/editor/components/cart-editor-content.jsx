'use client';

import { cn } from '@/modules/core/helpers/utils';
import { Textarea } from '@/modules/shadcn/ui/textarea';

export default function CardEditorContent({ className, content, setContent }) {
    return (
        <div className={cn(className)}>
            <Textarea
                className='bg-white placeholder:text-gray-300'
                placeholder='Cuéntale a Krys lo mucho que la amas.'
                minRows={3}
                maxRows={8}
                value={content}
                onChange={ev => setContent(ev.target.value)}
            />
        </div>
    );
}
