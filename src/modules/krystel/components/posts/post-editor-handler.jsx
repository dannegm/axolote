import { useState } from 'react';
import { Loader2, SendHorizonal } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';
import useCreatePostAction from '@/modules/krystel/hooks/use-create-post-action';
import Button from '@/modules/krystel/components/common/button';

const types = {
    post: {
        label: 'post',
    },
    image: {
        label: 'imagen',
    },
    drawing: {
        label: 'dibujo',
    },
    feeling: {
        label: 'mood',
    },
};

export default function PostEditorHandler({
    className,
    classNames,
    type = 'post',
    defaultContext = '',
    defaultSettings = '',
    children,
}) {
    const [indev] = useSettings('settings:posts:indev', false);
    const [skipActions] = useSettings('settings:skip_actions', false);

    const [sent, setSent] = useState(false);

    const [settings, setSettings] = useState(defaultSettings);
    const [context, setContext] = useState(defaultContext);
    const [content, setContent] = useState('');

    const createPost = useCreatePostAction({
        onSuccess: () => {
            handleReset();
            setSent(true);
        },
    });

    const handleReset = () => {
        setSettings(defaultSettings);
        setContext(defaultContext);
        setContent('');
    };

    const handleCreate = () => {
        const payload = {
            indev,
            skipActions,
            type,
            settings: settings.trim() || defaultSettings || null,
            context: context.trim() || defaultContext || null,
            content: content.trim(),
        };
        createPost.mutate(payload);
    };

    const canCreate = content.trim() !== '';

    if (sent) {
        return (
            <div
                className={cn(
                    'animate-in fade-in-0 slide-in-from-bottom-6 duration-150 ease-in',
                    'flex flex-col gap-4 px-4 py-4 pb-6 bg-white/60 text-base rounded-xl',
                )}
            >
                <p>
                    Tu <b>{types[type].label}</b> se ha enviado, puedes verlo en la sección de{' '}
                    <b>posts</b>.
                </p>

                <Button
                    as='a'
                    className={cn(
                        'flex-center gap-2 mx-auto py-2 w-fit text-sm [&_svg]:size-4',
                        classNames?.button,
                    )}
                    href='/krystel/posts'
                >
                    ✨ Llévame.
                </Button>
            </div>
        );
    }

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <div className={cn(classNames?.container)}>
                {children({
                    sent,
                    settings,
                    context,
                    content,
                    setSettings,
                    setContext,
                    setContent,
                })}
            </div>
            <div className={cn(classNames?.actions)}>
                {createPost.isPending ? (
                    <Button
                        className={cn(
                            'flex-center gap-2 mx-auto py-2 w-fit text-sm [&_svg]:size-4',
                            classNames?.button,
                        )}
                        disabled
                    >
                        <Loader2 className='animate-spin' />
                        <span>Enviar</span>
                    </Button>
                ) : (
                    <Button
                        className={cn(
                            'flex-center gap-2 mx-auto py-2 w-fit text-sm [&_svg]:size-4',
                            classNames?.button,
                        )}
                        disabled={!canCreate}
                        onClick={handleCreate}
                    >
                        <SendHorizonal />
                        <span>Enviar</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
