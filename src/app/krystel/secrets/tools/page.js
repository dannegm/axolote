import ClientOnly from '@/modules/core/components/common/client-only';
import ToolsGrid from './components/tools-grid';

export function generateMetadata() {
    return {
        title: 'Krystel - Tools',
    };
}

export default function Tools() {
    return (
        <ClientOnly>
            <div className='pt-4 pb-16'>
                <ToolsGrid />
            </div>
        </ClientOnly>
    );
}
