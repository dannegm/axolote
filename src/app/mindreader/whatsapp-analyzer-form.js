'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { addDays, format, subDays } from 'date-fns';
import { FolderSearch, SendHorizonal } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';
import Loader from '@/modules/core/components/common/loader';

export function WhatsAppAnalyzerForm({ onAnalysisComplete }) {
    const $picker = useRef();

    const [thinking, setThinking] = useState(false);
    const [file, setFile] = useState(null);
    const { register, watch, setValue, handleSubmit } = useForm();

    const startDate = watch('startDate');

    const fetchAnalysis = async data => {
        setThinking(true);
        const formData = new FormData();
        formData.append('conversation', file);
        formData.append('prompt', data.prompt);
        formData.append('startDate', new Date(data.startDate).toISOString());
        formData.append('endDate', new Date(data.endDate).toISOString());

        try {
            const response = await axios.post(
                'https://endpoints.hckr.mx/mindreader/analyze',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            onAnalysisComplete(response.data.analysis);
            setThinking(false);
        } catch (error) {
            console.error('Error al analizar la conversación:', error);
        }
    };

    const onSubmit = async data => {
        if (!file) return;
        fetchAnalysis(data);
    };

    return (
        <>
            {thinking && (
                <div className='fixed inset-0 bg-white/70 z-10'>
                    <Loader />
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className={cn(
                        'relative z-20 flex flex-col bg-gray-800 text-white rounded-md shadow-md transition-all duration-150',
                        {
                            'opacity-60': thinking,
                        },
                    )}
                >
                    <div className='flex flex-row gap-2 p-2'>
                        <textarea
                            id='prompt'
                            className='block w-full bg-transparent placeholder:text-gray-400 text-white outline-none resize-none'
                            placeholder='Escribe tu pregunta aquí...'
                            {...register('prompt', { required: true })}
                            disabled={thinking}
                        />

                        <button
                            type='submit'
                            className='flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow-sm'
                            disabled={thinking}
                        >
                            <SendHorizonal size='1.2rem' />
                        </button>
                    </div>

                    <div className='flex flex-row items-center justify-between gap-2 p-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <input
                                id='file'
                                ref={$picker}
                                className='hidden'
                                type='file'
                                accept='.txt'
                                onChange={e => setFile(e.target.files?.[0] || null)}
                                required
                            />
                            <button
                                className='flex flex-row items-center gap-2 p-2 bg-white text-sm text-gray-900 rounded-md shadow-sm'
                                onClick={() => $picker.current.click()}
                                disabled={thinking}
                            >
                                <FolderSearch size='1.2rem' />
                                <span className='hidden md:block'>Explorar</span>
                            </button>
                            <span className='hidden md:block flex-1 w-full bg-blue-800 px-2 py-0 text-sm rounded-sm'>
                                {file?.name}
                            </span>
                        </div>
                        <div className='flex flex-row items-center gap-2 px-2 bg-white text-black rounded-md'>
                            <input
                                id='startDate'
                                type='date'
                                {...register('startDate', { required: true })}
                                onChange={e => {
                                    setValue('startDate', e.target.value);
                                    const maxEndDate = addDays(new Date(e.target.value), 15);
                                    setValue('endDate', format(maxEndDate, 'yyyy-MM-dd'));
                                }}
                                disabled={thinking}
                            />
                            <input
                                id='endDate'
                                type='date'
                                {...register('endDate', { required: true })}
                                min={startDate}
                                max={
                                    startDate &&
                                    format(addDays(new Date(startDate), 15), 'yyyy-MM-dd')
                                }
                                disabled={thinking}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
