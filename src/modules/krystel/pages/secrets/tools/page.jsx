import SecretsLayout from '@/modules/krystel/components/layout/secrets-layout';
import ToolsGrid from './components/tools-grid';

export default function Tools() {
    return (
        <SecretsLayout title='Tools'>
            <div className='pt-4 pb-16'>
                <ToolsGrid />
            </div>
        </SecretsLayout>
    );
}
