'use client';
import { useState } from 'react';
import {
    CassetteTape,
    HandHeart,
    Image,
    Loader2,
    MessageSquareHeart,
    PenTool,
    SendHorizonal,
    Siren,
    Trash2,
} from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';

import SimpleEditor from './simple-editor';
import EmergencyButton from './emergency-button';
import useCreatePostAction from '../../hooks/use-create-post-action';

const editors = {
    post: {
        key: 'post',
        icon: <MessageSquareHeart />,
        component: SimpleEditor,
        enabled: true,
    },
    image: {
        key: 'image',
        icon: <Image />,
        component: SimpleEditor,
    },
    audio: {
        key: 'audio',
        icon: <CassetteTape />,
        component: SimpleEditor,
    },
    drawing: {
        key: 'drawing',
        icon: <PenTool />,
        component: SimpleEditor,
    },
    feeling: {
        key: 'feeling',
        icon: <HandHeart />,
        component: SimpleEditor,
    },
    emergency: {
        key: 'emergency',
        icon: <Siren />,
        component: EmergencyButton,
        defaultContent: 'Botón de pánico activado 🚨',
        enabled: true,
    },
};

const sendBlacklist = ['emergency'];

const IconButton = ({ className, active, children, ...props }) => {
    const iconClassNames = '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
    const buttonClassNames =
        'flex-center w-8 h-8 bg-gray-300 rounded-md transition-all duration-150 hover:bg-slate-300 active:scale-90 disabled:opacity-60 disabled:pointer-events-none';

    return (
        <button
            className={cn(
                buttonClassNames,
                iconClassNames,
                {
                    'bg-slate-500 text-white hover:bg-slate-700': active,
                },
                className,
            )}
            type='button'
            {...props}
        >
            {children}
        </button>
    );
};

export default function PostEditor() {
    const [selectedEditor, setSelectedEditor] = useState(editors.post.key);
    const [content, setContent] = useState('');

    const createPost = useCreatePostAction({
        onSuccess: () => {
            handleReset();
        },
    });

    const handleReset = () => {
        setContent('');
    };

    const handleSelect = editorKey => {
        handleReset();
        setSelectedEditor(editorKey);
    };

    const handleCreate = () => {
        const payload = {
            content: content.trim() || editors[selectedEditor].defaultContent,
            type: selectedEditor,
            deleted_at: sendBlacklist.includes(selectedEditor) ? new Date() : null,
        };
        console.log('creating', payload);
        createPost.mutate(payload);
    };

    const Editor = editors[selectedEditor].component || editors.post.component;
    const canCreate = content !== '' && !sendBlacklist.includes(selectedEditor);

    return (
        <div className='flex flex-col gap-4 bg-slate-100 rounded-lg p-4 shadow'>
            <div>
                <Editor
                    key={selectedEditor}
                    content={content}
                    setContent={setContent}
                    triggerCreate={handleCreate}
                />
            </div>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-1 items-center'>
                    {Object.values(editors).map(item => (
                        <IconButton
                            key={`icon-button-${item.key}`}
                            active={selectedEditor === item.key}
                            onClick={() => handleSelect(item.key)}
                            disabled={!item.enabled || createPost.isPending}
                        >
                            {item.icon}
                        </IconButton>
                    ))}
                    <IconButton
                        className='bg-red-500 text-white hover:bg-red-700'
                        onClick={handleReset}
                    >
                        <Trash2 />
                    </IconButton>
                </div>

                <div className='flex flex-row gap-1'>
                    {createPost.isPending ? (
                        <IconButton
                            className='rounded-full bg-indigo-500 text-white shadow scale-110 hover:bg-indigo-700'
                            disabled
                        >
                            <Loader2 className='animate-spin' />
                        </IconButton>
                    ) : (
                        <IconButton
                            className='rounded-full bg-indigo-500 text-white shadow scale-125 hover:bg-indigo-700 active:scale-110'
                            disabled={!canCreate}
                            onClick={handleCreate}
                        >
                            <SendHorizonal />
                        </IconButton>
                    )}
                </div>
            </div>
        </div>
    );
}
