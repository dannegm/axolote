import { icons } from 'lucide-react';
import { pascalCase } from '@/modules/core/helpers/strings';

const defaultIcon = 'square-dashed';

export default function Icon({ className, size = '1rem', name = defaultIcon }) {
    const LucideIcon = icons[pascalCase(name)] || icons[pascalCase(defaultIcon)];
    return <LucideIcon className={className} size={size} />;
}
