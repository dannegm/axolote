import { cloneElement, isValidElement } from 'react';
import { usePathname } from 'next/navigation';

import { umami } from '@/modules/core/services/umami';

export function TrackClick({ name = 'click', data = {}, children }) {
    const pathname = usePathname();

    if (!isValidElement(children)) return children;

    const handleClick = () => {
        umami.track({
            name,
            data,
            url: pathname,
        });
    };

    return cloneElement(children, { onClick: handleClick });
}
