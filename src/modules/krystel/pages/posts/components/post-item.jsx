import { useCallback, useEffect, useRef, useState } from 'react';
import { formatDistanceToNowStrict, format, isBefore } from 'date-fns';
import { es as locale } from 'date-fns/locale';

import { ReactSketchCanvas } from 'react-sketch-canvas';

import {
    Clock3,
    HandHeart,
    Image,
    MessageSquareHeart,
    PenTool,
    Siren,
    Download,
    PlayCircle,
} from 'lucide-react';

import { cn, downloadBase64 } from '@/modules/core/helpers/utils';
import useSettings from '@/modules/core/hooks/use-settings';
import useResize from '@/modules/core/hooks/use-resize';

import { feelings } from '@/modules/krystel/helpers/feelings';
import { getColorClassName } from '@/modules/krystel/helpers/colors';
import RichText from '@/modules/krystel/components/common/rich-text';

import { Button } from '@/modules/shadcn/ui/button';
import PostItemMenu from './post-item-menu';

const SimpleItem = ({ item }) => {
    return (
        <div className='flex-1 px-4 py-2 bg-gray-100 rounded-xl rounded-tl-none'>
            <RichText>{item.content}</RichText>
        </div>
    );
};

const useReplayDrawing = ($canvas, originalStrokes, skipSteps = 10) => {
    const startReplay = useCallback(() => {
        if (!originalStrokes.length || !$canvas?.current) return;
        $canvas.current?.clearCanvas();
        $canvas.current?.resetCanvas();

        let index = 0;
        let pathIndex = 0;
        let newStrokes = [];

        const step = () => {
            const currentStroke = originalStrokes[index];
            if (!newStrokes[index]) {
                newStrokes[index] = { ...currentStroke, paths: [] };
            }

            if (pathIndex < currentStroke.paths.length) {
                newStrokes[index].paths.push(currentStroke.paths[pathIndex]);
                pathIndex += skipSteps; // Skip specified number of steps
            } else {
                index++;
                pathIndex = 0;
            }

            $canvas.current.loadPaths(newStrokes);

            if (index < originalStrokes.length) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [originalStrokes, $canvas, skipSteps]); // Add dependencies

    useEffect(() => {
        $canvas.current?.loadPaths(originalStrokes);
    }, []);

    return { startReplay };
};

const DrawingItem = ({ item }) => {
    const settings = JSON.parse(item.settings);
    const paths = JSON.parse(item.content) || [];

    const $container = useRef();
    const $canvas = useRef();
    const [scaleFactor, setScaleFactor] = useState(1);

    const { startReplay } = useReplayDrawing($canvas, paths);

    // useEffect(() => {
    // $canvas.current?.loadPaths(paths);
    // }, [paths]);

    useResize(() => {
        if ($container.current) {
            const windowWidth = window.innerWidth;
            const containerWidth = windowWidth - 220;
            setScaleFactor(containerWidth / windowWidth);
        }
    });

    const handleDownload = async () => {
        const exportImage = await $canvas.current?.exportImage('png');
        downloadBase64(exportImage, `'krystel-drawing-${Date.now()}.png'`);
    };

    return (
        <div className='relative z-50 flex-1 px-4 py-2 bg-white border border-sky-300 rounded-xl rounded-tl-none'>
            <div
                ref={$container}
                className='pointer-events-none'
                style={{
                    width: settings?.width * scaleFactor,
                    height: settings?.height * scaleFactor,
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <ReactSketchCanvas
                    id={`drawing-${item.id}`}
                    className='z-0'
                    ref={$canvas}
                    style={{
                        border: 0,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) scale(${scaleFactor})`,
                    }}
                    width={settings?.width}
                    height={settings?.height}
                    canvasColor='white'
                    withViewBox
                    readOnly
                />
            </div>
            <Button
                className='absolute bottom-2 left-2 text-black'
                variant='outline'
                size='icon'
                onClick={startReplay}
            >
                <PlayCircle />
            </Button>

            <Button
                className='absolute bottom-2 right-2 text-black'
                variant='outline'
                size='icon'
                onClick={handleDownload}
            >
                <Download />
            </Button>
        </div>
    );
};

const FeelingItem = ({ item }) => {
    const bgClassName = getColorClassName('bg', feelings[item.content]?.color, 300);
    const icon = feelings[item.content]?.icon || item.content;

    return (
        <div
            className={cn(
                'flex-1 flex flex-col flex-center gap-2 p-4 bg-violet-100 rounded-xl rounded-tl-none',
                bgClassName,
            )}
        >
            {icon !== item.content && (
                <span className='block h-16 -mt-4 mb-2 text-[4rem]'>{icon}</span>
            )}
            <span
                className={cn(
                    'flex-1 block font-noto font-bold text-md text-white text-center opacity-90',
                    {
                        'text-black': !bgClassName,
                    },
                )}
            >
                {`~ ${item.content} ~`}
            </span>
        </div>
    );
};

const EmergencyItem = ({ item }) => {
    return (
        <div className='flex-1 px-4 py-2 bg-red-100 rounded-xl rounded-tl-none'>{item.content}</div>
    );
};

const ImageItem = ({ item }) => {
    const content = JSON.parse(item.content) || null;
    if (!content?.url) return null;
    return (
        <div className='flex-1 flex flex-col gap-2'>
            <figure
                className={cn(
                    'max-w-[75vw] w-auto overflow-hidden rounded-lg rounded-tl-none shadow-sm',
                    {
                        'rounded-l-none': content?.description,
                    },
                )}
            >
                <img className='w-full' src={content?.url} alt={content?.description} />
            </figure>
            {content?.description && (
                <figcaption className='flex-none w-fit max-w-full px-4 py-2 text-pretty bg-neutral-200 rounded-xl rounded-tl-none'>
                    {content?.description}
                </figcaption>
            )}
        </div>
    );
};

const elements = {
    post: {
        key: 'post',
        icon: MessageSquareHeart,
        iconClassName: '',
        component: SimpleItem,
    },
    drawing: {
        key: 'drawing',
        icon: PenTool,
        iconClassName: 'bg-sky-600 text-white',
        component: DrawingItem,
    },
    feeling: {
        key: 'feeling',
        icon: HandHeart,
        iconClassName: 'bg-violet-600 text-white',
        component: FeelingItem,
    },
    emergency: {
        key: 'emergency',
        icon: Siren,
        iconClassName: 'bg-red-600 text-white',
        component: EmergencyItem,
    },
    image: {
        key: 'image',
        icon: Image,
        iconClassName: 'bg-cyan-600 text-white',
        component: ImageItem,
    },
};

export default function PostItem({ item }) {
    const [includesIndev] = useSettings('settings:posts:includes_indev', false);

    const Element = elements[item.type]?.component || elements.post.component;
    const Icon = elements[item.type]?.icon || elements.post.icon;
    const iconClassName = elements[item.type]?.iconClassName || elements.post.iconClassName;

    const date = new Date(item.created_at);
    const datePrefix = isBefore(date, new Date()) ? 'hace ' : 'dentro de ';

    return (
        <div className='flex flex-col gap-2 items-start md:w-full py-4 border-t border-gray-200 text-sm first:border-none'>
            <div
                className={cn('relative flex-1 w-full flex flex-row gap-2 pr-4', {
                    'border-r-4 border-r-indigo-500 pr-2': includesIndev,
                    'border-r-4 border-r-slate-200 pr-2': item.indev,
                    'border-r-4 border-r-red-500 pr-2': item.deleted_at,
                })}
            >
                <PostItemMenu
                    className={cn('absolute z-[60] top-0 right-0', {
                        'right-2': includesIndev,
                    })}
                    item={item}
                />

                <div
                    className={cn(
                        'flex-none flex-center w-8 h-8 bg-slate-200 text-slate-800 rounded-2xl',
                        iconClassName,
                    )}
                >
                    <Icon size='1rem' />
                </div>

                <div className='flex flex-col items-start gap-1'>
                    {item.context && (
                        <div className='text-xs font-noto font-bold text-slate-500'>
                            {item.context}
                        </div>
                    )}
                    <div className='flex-none'>
                        <Element item={item} />
                    </div>

                    <span className='text-gray-500 flex gap-1 items-center text-xs'>
                        <Clock3 size='0.85rem' />
                        {datePrefix + formatDistanceToNowStrict(date, { locale })} -{' '}
                        {format(date, 'MMMM d, yyyy · h:mm aaa', { locale })}
                    </span>
                </div>
            </div>
        </div>
    );
}
