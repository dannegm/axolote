'use client';

import Button from '@/components/common/button';
import useClearLogsAction from '@/modules/krystel/hooks/use-clear-logs-action';
import { Trash2 } from 'lucide-react';

export default function ClearLogsButton() {
    const clearLogs = useClearLogsAction();
    return (
        <Button
            className='fixed bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white'
            onClick={() => clearLogs()}
        >
            <Trash2 size={20} />
            <span className='ml-2'>Clear logs</span>
        </Button>
    );
}
