'use client';
import { useRef, useEffect, useState, isValidElement } from 'react';
import { cn } from '@/modules/core/helpers/utils';

const DEFAULT_BREAKPOINTS = {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
};

export default function ResponsiveBox({
    children,
    className = '',
    breakpoints = DEFAULT_BREAKPOINTS,
    breakpointsClassNames = {},
}) {
    const $box = useRef(null);
    const [breakpoint, setBreakpoint] = useState('default');
    const [size, setSize] = useState('');

    useEffect(() => {
        const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]);

        const observer = new ResizeObserver(([entry]) => {
            const width = entry.contentRect.width;
            let matchedSize = 'default';

            for (const [key, value] of sortedBreakpoints) {
                if (width >= value) {
                    matchedSize = key;
                } else {
                    break;
                }
            }

            setSize(width);
            setBreakpoint(matchedSize);
        });

        if ($box.current) observer.observe($box.current);
        return () => observer.disconnect();
    }, [breakpoints]);

    return (
        <div ref={$box} className={cn(className, breakpointsClassNames[breakpoint] || '')}>
            {isValidElement(children) ? children : children({ breakpoint, size })}
        </div>
    );
}
