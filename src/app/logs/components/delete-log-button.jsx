'use client';

import { X } from 'lucide-react';
import useTimeout from '@/modules/core/hooks/use-timeout';
import useDeleteLogAction from '@/modules/krystel/hooks/use-detelete-log-action';

export default function DeleteLogButton({ id, onDelete }) {
    const deleteLog = useDeleteLogAction();

    const handleDelete = () => {
        onDelete?.();
        deleteLog(id);
    };

    return (
        <button
            type='button'
            className='cursor-pointer bg-gray-200 text-gray-500 hover:scale-110 hover:bg-slate-300 hover:shadow-sm active:scale-95 rounded-full h-5 w-5 inline-flex items-center justify-center transition-all'
            onClick={handleDelete}
        >
            <X size='0.85rem' strokeWidth='4px' />
        </button>
    );
}
