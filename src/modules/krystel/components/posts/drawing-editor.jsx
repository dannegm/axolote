'use client';
import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

import { CloudDownload, Eraser, PenTool, Redo2, RotateCcw, Trash2, Undo2 } from 'lucide-react';

import { cn, downloadBase64 } from '@/modules/core/helpers/utils';
import { unique } from '@/modules/core/helpers/arrays';
import useResize from '@/modules/core/hooks/use-resize';
import useDebouncedCallback from '@/modules/core/hooks/use-debounced-callback';

import { ColorPicker as ShadcnColorPicker } from '@/modules/shadcn/ui/color-picker';

const defaultColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

const Button = ({ className, active, icon, onClick }) => {
    const buttonClassName =
        'flex-center size-6 border border-black/70 text-black/85 rounded-full [&_svg]:size-4 transition-all duration-150 hover:bg-slate-200 active:scale-95';

    const conditionalClassNames = {
        'ring-2 ring-blue-500 bg-blue-100': active,
    };
    return (
        <button
            className={cn(buttonClassName, conditionalClassNames, className)}
            type='button'
            onClick={onClick}
        >
            {icon}
        </button>
    );
};

const ToolBar = ({ className, direction, position, children }) => {
    const toolbarClassName = 'absolute flex flex-row gap-1';

    const positions = {
        'top-left': 'top-2 left-2',
        'top-right': 'top-2 right-2',
        'top-center': 'top-2 left-1/2 transform -translate-x-1/2',
        'bottom-left': 'bottom-2 left-2',
        'bottom-right': 'bottom-2 right-2',
        'bottom-center': 'bottom-2 left-1/2 transform -translate-x-1/2',
        'middle-left': 'left-2 top-1/2 transform -translate-y-1/2',
        'middle-right': 'right-2 top-1/2 transform -translate-y-1/2',
    };

    const positionClassName = positions[position] || positions['top-left'];

    const conditionalClassNames = {
        'flex-col': direction === 'vertical',
    };

    return (
        <div className={cn(toolbarClassName, positionClassName, conditionalClassNames, className)}>
            {children}
        </div>
    );
};

const Circle = ({ className, color }) => {
    return (
        <div
            className={cn('size-4 border border-white rounded-full', className)}
            style={{ backgroundColor: color }}
        />
    );
};

const ColorPicker = ({ className, direction, position, colors = [], color, onSelect }) => {
    const [internalColors, setInternalColors] = useState([]);
    const [colorsList, setColorsList] = useState([]);

    const handlePickerSelect = selectedColor => {
        onSelect(selectedColor);
        setInternalColors(prev => unique([selectedColor, ...prev]));
    };

    const handleResetColors = () => {
        setInternalColors([]);
    };

    const shiftedColors = colorsList.slice(0, 10);

    useEffect(() => {
        const newColorsList = unique([...internalColors, ...colors]);
        setColorsList(newColorsList);
    }, [internalColors, colors]);

    return (
        <ToolBar className={className} direction={direction} position={position}>
            <ShadcnColorPicker color={color} onSelect={handlePickerSelect}>
                {() => <Button icon={<Circle className='bg-chromatic-wheel' />} />}
            </ShadcnColorPicker>

            {!shiftedColors.includes(color) && (
                <Button icon={<Circle color={color} />} onClick={() => onSelect?.(color)} active />
            )}

            {shiftedColors.map((c, index) => (
                <Button
                    key={`color-picker-${c}`}
                    active={c === color}
                    icon={<Circle color={c} />}
                    className={cn({
                        hidden: index >= 6,
                    })}
                    onClick={() => onSelect?.(c)}
                />
            ))}

            <Button icon={<RotateCcw />} onClick={handleResetColors} />
        </ToolBar>
    );
};

const StrokeWidthPicker = ({ className, direction, position, strokeWidth, onSelect }) => {
    const widths = [
        // ...
        'size-[20px]',
        'size-[16px]',
        'size-[12px]',
        'size-[8px]',
        'size-[4px]',
    ];

    const handleSelect = value => {
        onSelect?.(Number(value));
    };
    return (
        <ToolBar className={className} direction={direction} position={position}>
            {widths.map(widthClassName => {
                const width = widthClassName.match(/\d+/)[0];
                return (
                    <Button
                        key={`stroke-width-picker-${width}`}
                        active={Number(strokeWidth) === Number(width)}
                        icon={<Circle className={cn(widthClassName)} color='black' />}
                        onClick={() => handleSelect(width)}
                    />
                );
            })}
        </ToolBar>
    );
};

export default function DrawingEditor({ content, props, setContent, setSettings }) {
    const $canvas = useRef();
    const $container = useRef();

    const [erase_mode, setEraseMode] = useState(false);
    const [color, setColor] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(8);

    const reset = () => {
        $canvas.current?.clearCanvas();
        $canvas.current?.resetCanvas();
    };
    const clear = () => $canvas.current?.clearCanvas();
    const undo = () => $canvas.current?.undo();
    const redo = () => $container.current?.redo();
    const drawMode = () => {
        setEraseMode(false);
        $canvas.current?.eraseMode(false);
    };
    const eraseMode = () => {
        setEraseMode(true);
        $canvas.current?.eraseMode(true);
    };
    const download = async () => {
        const exportImage = await $canvas.current?.exportImage('png');
        downloadBase64(exportImage, `'krystel-drawing-${Date.now()}.png'`);
    };

    const handleChange = useDebouncedCallback((paths = []) => {
        if (paths.length) {
            const payload = JSON.stringify(paths);
            setContent(payload);
        }
    });

    useResize(() => {
        const { width, height } = $container.current?.getBoundingClientRect();
        const payload = JSON.stringify({
            width: Math.floor(width),
            height: Math.floor(height),
        });
        setSettings(payload);
    });

    useEffect(() => {
        if (!content) {
            reset();
        }
    }, [content]);

    return (
        <div
            ref={$container}
            className={cn(
                'relative flex-1 m-h-[296px] w-full h-full rounded-lg overflow-hidden shadow-2xs',
                props?.className,
            )}
        >
            <ToolBar position='top-left'>
                <Button onClick={clear} icon={<Trash2 />} />
            </ToolBar>

            <ToolBar position='top-center'>
                <Button onClick={download} icon={<CloudDownload />} />
            </ToolBar>

            <ToolBar position='top-right'>
                <Button onClick={undo} icon={<Undo2 />} />
                <Button onClick={redo} icon={<Redo2 />} />
            </ToolBar>

            <ToolBar position='middle-right' direction='vertical'>
                <Button active={!erase_mode} onClick={drawMode} icon={<PenTool />} />
                <Button active={erase_mode} onClick={eraseMode} icon={<Eraser />} />
            </ToolBar>

            <StrokeWidthPicker
                position='middle-left'
                direction='vertical'
                strokeWidth={strokeWidth}
                onSelect={setStrokeWidth}
            />

            <ColorPicker
                position='bottom-center'
                colors={defaultColors}
                color={color}
                onSelect={setColor}
            />

            <ReactSketchCanvas
                ref={$canvas}
                style={{
                    border: 0,
                }}
                width='100%'
                height='100%'
                canvasColor='white'
                strokeColor={color}
                strokeWidth={strokeWidth}
                eraserWidth={strokeWidth}
                onChange={handleChange}
                withViewBox
                withTimestamp
            />
        </div>
    );
}
