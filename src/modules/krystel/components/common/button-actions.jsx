'use client';

import { useQueryState, parseAsBoolean } from 'nuqs';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';
import Button from '@/modules/krystel/components/common/button';

export default function ButtonActions({ className, action, input, props = {}, label }) {
    const [, setMenuOpen] = useQueryState('menu', parseAsBoolean.withDefault(false));
    const [, setMenuDemo] = useQueryState('menu-demo');

    const [, setSkipFoolsDay] = useSettings('settings:cards:skip_fools_day', false);

    const actions = {
        default: () => null,
        openMenu: () => {
            setMenuOpen(true);
        },
        menuDemo: ({ input }) => {
            setMenuOpen(true);
            setMenuDemo(input);
        },
        skipFoolsDay: () => {
            setSkipFoolsDay(i => !i);
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
