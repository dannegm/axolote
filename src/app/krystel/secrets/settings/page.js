import ClientOnly from '@/modules/core/components/common/client-only';
import Settings from './components/settings';

export function generateMetadata() {
    return {
        title: 'Krystel - Settings',
    };
}

export default function Tools() {
    return (
        <ClientOnly>
            <div className='pt-4 pb-16'>
                <Settings />
            </div>
        </ClientOnly>
    );
}
