'use client';

import { Textarea } from '@/modules/shadcn/ui/textarea';

export default function SimpleEditor({ content, setContent, props }) {
    const handleChange = ev => {
        setContent(ev.target.value);
    };

    return (
        <div>
            <Textarea
                className='bg-white/30 focus:bg-white transition-all duration-150'
                minRows={4}
                maxRows={8}
                value={content}
                placeholder={props?.placeholder}
                onChange={handleChange}
            />
        </div>
    );
}
