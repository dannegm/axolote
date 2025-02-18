import { icons } from 'lucide-react';

const defaultIcon = 'SquareDashed';

export default function Icon({ className, size = '1rem', name = defaultIcon }) {
    const LucideIcon = icons[name] || icons[defaultIcon];
    return <LucideIcon className={className} size={size} />;
}
