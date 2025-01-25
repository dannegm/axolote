import { cn } from '@/modules/core/helpers/utils';

const getComponentType = as => {
    const types = {
        button: 'button',
        a: 'a',
    };
    return types[as] || 'button';
};

export default function Button({ className, children, as = 'button', ...props }) {
    const Component = getComponentType(as);

    return (
        <Component
            className={cn(
                'flex flex-row justify-center items-center px-6 py-3 rounded-full shadow-md font-delius',
                'transition-all duration-100 bg-white text-gray-800',
                'hover:shadow-lg hover:bg-gray-50 hover:scale-110',
                'active:shadow-sm active:scale-100',
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
