'use client';
import * as React from 'react';
import { HexColorPicker } from 'react-colorful';

import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shadcn/ui/popover';

function ColorPicker({ color, children, onChange, onSelect }) {
    const $target = React.useRef();
    const [internalColor, setInternalColor] = React.useState(color);

    const handleOpenChange = open => {
        if (!open) {
            onSelect?.(internalColor);
        }
    };

    React.useEffect(() => {
        onChange?.(internalColor);
    }, [internalColor]);

    React.useLayoutEffect(() => {
        const popperElement = document.querySelector('[data-radix-popper-content-wrapper]');

        if ($target.current && popperElement) {
            const { top, left } = $target.current.getBoundingClientRect();
            popperElement.style.transform = `translate(${left}px, ${top}px)`;
        }
    }, []);

    return (
        <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <div ref={$target}>{children(color)}</div>
            </PopoverTrigger>
            <PopoverContent align='start' className='w-auto p-0'>
                <HexColorPicker color={internalColor} onChange={setInternalColor} />
            </PopoverContent>
        </Popover>
    );
}
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
