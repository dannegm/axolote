'use client';

import { useQueryState, parseAsBoolean } from 'nuqs';
import Button from '@/modules/krystel/components/common/button';
import { cn } from '@/modules/core/helpers/utils';

export default function ButtonActions({ className, action, input, props = {}, label }) {
    const [, setMenuOpen] = useQueryState('menu', parseAsBoolean.withDefault(false));

    const actions = {
        default: () => null,
        openMenu: () => {
            setMenuOpen(true);
        },
        inputSample: ({ input }) => {
            alert(input);
        },
        propsSample: ({ name, age }) => {
            alert(`${name}, ${age} años`);
        },
    };

    const handleAction = () => {
        const executor = actions[action] || actions.default;
        executor({ input, ...props });
    };

    return (
        <Button className={cn('block w-fit text-sm', className)} onClick={handleAction}>
            {label}
        </Button>
    );
}
