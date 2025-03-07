'use client';

import { cn } from '@/modules/core/helpers/utils';
import { Textarea } from '@/modules/shadcn/ui/textarea';

export default function SimpleEditor({ content, setContent, props }) {
    const handleChange = ev => {
        setContent(ev.target.value);
    };

    return (
        <div>
            <Textarea
                className={cn(
                    'bg-white/30 focus:bg-white transition-all duration-150',
                    props?.className,
                )}
                minRows={props?.minRows || 4}
                maxRows={props?.maxRows || 8}
                value={content}
                placeholder={props?.placeholder}
                onChange={handleChange}
            />
        </div>
    );
}
