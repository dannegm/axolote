import { useState } from 'react';
import { cn } from '@/modules/core/helpers/utils';
import useScrollPosition from '@/modules/core/hooks/use-scroll-position';

export default function FloatingElement({
    staticElement,
    floatingElement,
    offset = 0,
    appearsStrategy = 'conditional',
    appearsClassNames = 'block',
    hiddenClassNames = 'hidden',
}) {
    const [floating, setFloating] = useState(false);

    useScrollPosition({
        onScroll: ({ scrollTop }) => {
            setFloating(offset < scrollTop);
        },
    });

    return (
        <>
            {staticElement}
            {floating && appearsStrategy === 'conditional' && floatingElement}
            {appearsStrategy === 'className' && (
                <div
                    className={cn({
                        [appearsClassNames]: floating,
                        [hiddenClassNames]: !floating,
                    })}
                >
                    {floatingElement}
                </div>
            )}
        </>
    );
}
