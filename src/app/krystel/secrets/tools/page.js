import Settings from './components/settings';
import ToolsGrid from './components/tools-grid';

export function generateMetadata() {
    return {
        title: 'Krystel - Tools',
    };
}

export default function Tools() {
    return (
        <div className='pt-4 pb-16'>
            <ToolsGrid />
            <Settings />
        </div>
    );
}
