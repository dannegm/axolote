'use client';

import useDeleteLogAction from '@/modules/krystel/hooks/use-detelete-log-action';
import { X } from 'lucide-react';

export default function DeleteLogButton({ id }) {
    const deleteLog = useDeleteLogAction();
    return (
        <button
            type='button'
            className='cursor-pointer bg-gray-200 text-gray-500 hover:scale-110 hover:bg-slate-300 hover:shadow-sm active:scale-95 rounded-full h-5 w-5 inline-flex items-center justify-center transition-all'
            onClick={() => deleteLog(id)}
        >
            <X size='0.85rem' strokeWidth='4px' />
        </button>
    );
}
