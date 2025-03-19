import { cn } from '@/modules/core/helpers/utils';

export default function Frame({ className, children }) {
    return (
        <div data-layer='app-frame' className={cn(className)}>
            {children}
        </div>
    );
}
