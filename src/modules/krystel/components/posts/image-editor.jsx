'use client';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/modules/core/helpers/utils';
import { supabase } from '@/modules/core/services/supabase';

import { Textarea } from '@/modules/shadcn/ui/textarea';

const allowedTypes = ['image/*'].join(',');

const $storage = supabase.storage.from('quotes');

export default function ImageEditor({ content, setContent, props }) {
    const $picker = useRef();

    const [file, setFile] = useState(null);
    const [cachedPreview, setCachedPreview] = useState(null);
    const [preview, setPreview] = useState(null);
    const [url, setUrl] = useState(null);
    const [description, setDescription] = useState('');

    const handlePickerOpen = () => {
        setFile(null);
        $picker.current.click();
    };

    const uploadImage = async () => {
        if (!file) return;

        const fileName = `krystel/post_${Date.now()}_${file.name}`;
        const { error } = await $storage.upload(fileName, file);

        if (error) {
            alert(error.message);
            return;
        }

        const { data } = $storage.getPublicUrl(fileName);
        setUrl(data?.publicUrl);
        setPreview(data?.publicUrl);
    };

    const makePreview = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            setCachedPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const makePayload = () => {
        if (!url) return;

        const payload = { url, description: description.trim() };
        setContent(JSON.stringify(payload));
    };

    const reset = () => {
        setFile(null);
        setPreview('');
        setCachedPreview('');
        setUrl('');
        setDescription('');
    };

    useEffect(() => {
        makePreview();
        uploadImage();
    }, [file]);

    useEffect(() => {
        makePayload();
    }, [url, description]);

    useEffect(() => {
        if (content === '') {
            reset();
        }
    }, [content]);

    return (
        <div
            className={cn(
                'relative w-full h-[280px] bg-slate-500 bg-img-gradient-blue bg-cover rounded-lg shadow-md overflow-hidden',
                props?.className,
            )}
            style={{
                backgroundImage: cachedPreview ? `url(${cachedPreview})` : '',
            }}
        >
            {preview && (
                <div
                    className={cn(
                        'animate-in fade-in-0 slide-in-from-bottom-6 duration-300 ease-in',
                        'absolute z-10 top-4 bottom-4 left-1/2 transofrm -translate-x-1/2',
                        'max-w-[90%] min-w-[240px] overflow-hidden',
                        'rounded-lg shadow-sm transition-all duration-150',
                        {
                            'opacity-50': preview,
                            'opacity-100': url,
                        },
                        props?.classNames?.imageContainer,
                    )}
                >
                    <img
                        className={cn('block w-full h-full object-cover', props?.classNames?.image)}
                        src={preview}
                    />
                </div>
            )}

            {cachedPreview && (
                <div
                    className={cn(
                        'absolute inset-0 bg-black/30 backdrop-blur-lg z-0',
                        {
                            'bg-black/20 backdrop-blur-sm': url,
                        },
                        props?.classNames?.overlay,
                    )}
                />
            )}

            <input
                ref={$picker}
                className='hidden'
                type='file'
                accept={allowedTypes}
                onClick={() => setFile(null)}
                onChange={ev => setFile(ev.target.files[0])}
            />

            <div
                className={cn(
                    'absolute z-20 bottom-8 left-1/2 transofrm -translate-x-1/2 flex flex-col gap-2 min-w-[200px]',
                    {
                        'bottom-1/2 translate-y-1/2': !preview,
                    },
                    props?.classNames?.pickerContainer,
                )}
            >
                <button
                    className={cn(
                        'flex-center gap-2 px-6 py-4 bg-white text-black text-sm text-center font-noto rounded-full shadow-lg transition-all duration-150 hover:scale-105 active:scale-100 [&_svg]:size-5',
                        {
                            'mt-4': !preview,
                        },
                        props?.classNames?.pickerButton,
                    )}
                    onClick={handlePickerOpen}
                >
                    <Search />
                    Buscar imagen
                </button>

                {preview && (
                    <Textarea
                        className={cn(
                            'bg-white/90 text-base backdrop-blur-lg border-none',
                            props?.classNames?.inputDescription,
                        )}
                        placeholder='Añade una descripción'
                        minRows={props?.minRows || 2}
                        maxRows={props?.maxRows || 4}
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                    />
                )}
            </div>
        </div>
    );
}
