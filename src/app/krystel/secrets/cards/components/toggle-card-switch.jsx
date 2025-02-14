'use client';

import { Switch } from '@/modules/shadcn/ui/switch';
import useToggleQuoteAction from '@/modules/krystel/hooks/use-toggle-quote-action';

export default function ToggleCardButton({ id, show, onToggle }) {
    const toggleQuote = useToggleQuoteAction();

    const handleSwitch = checked => {
        onToggle?.();
        toggleQuote(id, checked);
    };

    return <Switch checked={show} onCheckedChange={handleSwitch} />;
}
