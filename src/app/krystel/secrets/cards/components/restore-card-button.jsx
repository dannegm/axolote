'use client';

import useRestoreQuoteAction from '@/modules/krystel/hooks/use-restore-quote-action';

export default function RestoreCardButton({ id, onRestore }) {
    const restoreQuote = useRestoreQuoteAction();

    const handleRestore = () => {
        onRestore?.();
        restoreQuote.mutate({ quoteId: id });
    };

    return (
        <button
            type='button'
            className='cursor-pointer bg-gray-200 text-gray-500 font-bold text-xs px-3 hover:scale-110 hover:bg-slate-300 hover:shadow-sm active:scale-95 rounded-full h-5 inline-flex items-center justify-center transition-all'
            onClick={handleRestore}
        >
            Restore
        </button>
    );
}
