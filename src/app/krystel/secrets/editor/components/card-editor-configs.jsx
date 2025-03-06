'use client';
import { useEffect, useImperativeHandle, useState, useCallback } from 'react';
import { capitalize } from 'lodash';
import { Shuffle, SquareDashed } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { tailwind } from '@/modules/core/helpers/tailwind';

import { Label } from '@/modules/shadcn/ui/label';
import { Button } from '@/modules/shadcn/ui/button';
import { Switch } from '@/modules/shadcn/ui/switch';
import { Input } from '@/modules/shadcn/ui/input';
import { TagInput } from '@/modules/shadcn/ui/tag-input';
import { IconPicker } from '@/modules/shadcn/ui/icon-picker';
import { Separator } from '@/modules/shadcn/ui/separator';
import { ScrollArea } from '@/modules/shadcn/ui/scroll-area';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/modules/shadcn/ui/select';

import { themes } from '@/modules/krystel/helpers/themes';
import { useGreetings } from '@/modules/krystel/services/greetings';

const tailwindSuggestions = tailwind;

const classNamesToArray = (classNames = '') => {
    if (!classNames) return [];
    return classNames
        .split(' ')
        .filter(str => str.trim())
        .map(className => ({
            id: `classname-${className}-${Date.now()}`,
            text: className,
        }));
};

const useNextTick = (fn, deps = []) => {
    return useCallback(
        (...args) => {
            return new Promise(resolve => {
                setTimeout(() => resolve(fn(...args)), 1000);
            });
        },
        [fn, ...deps],
    );
};

export default function CardEditorConfigs({ ref, className, configs, setConfigs }) {
    const greetingsPlaceholder = useGreetings();

    const [letter, setLetter] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [fullwidth, setFullwidth] = useState(false);
    const [theme, setTheme] = useState('default');
    const [icon, setIcon] = useState('random');
    const [frame, setFrame] = useState('');
    const [dark, setDark] = useState(false);
    const [bg, setBg] = useState([]);
    const [border, setBorder] = useState([]);
    const [scheme, setScheme] = useState([]);
    const [date, setDate] = useState(true);
    const [target, setTarget] = useState('');

    const [greetings, setGreetings] = useState('');
    const [greetingsShow, setGreetingsShow] = useState(true);

    useEffect(() => {
        const configsObject = {
            letter,
            fullscreen,
            fullwidth,
            theme,
            icon,
            frame,
            dark,
            target,
            bg: bg.map(i => i.text).join(' '),
            border: border.map(i => i.text).join(' '),
            scheme: scheme.map(i => i.text).join(' '),
            date: date ? 'default' : 'hidden',
            greetings: !greetingsShow ? 'hidden' : greetings === '' ? 'random' : greetings,
        };
        setConfigs(configsObject);
    }, [
        letter,
        fullscreen,
        fullwidth,
        theme,
        icon,
        greetings,
        greetingsShow,
        frame,
        dark,
        bg,
        border,
        scheme,
        date,
        target,
    ]);

    const reload = (confs = configs) => {
        setLetter(confs?.letter);
        setFullscreen(confs?.fullscreen);
        setFullwidth(confs?.fullwidth);
        setTheme(confs?.theme || 'default');
        setIcon(confs?.icon || 'random');
        setFrame(confs?.frame);
        setDark(confs?.dark);
        setBg(classNamesToArray(confs?.bg));
        setBorder(classNamesToArray(confs?.border));
        setScheme(classNamesToArray(confs?.scheme));
        setDate(Boolean(confs?.date === undefined || confs?.date !== 'hidden'));
        setGreetings(confs?.greetings);
        setGreetingsShow(confs?.greetings !== 'hidden');
        setTarget(confs?.target);
    };

    useImperativeHandle(ref, () => ({ reload }));

    useEffect(() => {
        reload();
    }, []);

    return (
        <ScrollArea
            className={cn(
                'w-[calc(100%+32px)] h-auto max-h-[320px] sm:max-h-[400px] overflow-scroll -mx-4 pb-4',
                className,
            )}
            type='always'
        >
            <div className={cn('flex flex-col gap-4 mx-4')}>
                {/* Letter Mode */}
                <div className='flex flex-row justify-between items-center'>
                    <Label htmlFor='configs:letter'>Letter mode</Label>
                    <Switch id='configs:letter' checked={letter} onCheckedChange={setLetter} />
                </div>

                {/* Fullscreen */}
                <Separator />
                <div className='flex flex-row justify-between items-center'>
                    <Label htmlFor='configs:fullscreen'>Fullscreen</Label>
                    <Switch
                        id='configs:fullscreen'
                        checked={fullscreen}
                        onCheckedChange={setFullscreen}
                    />
                </div>

                {/* Fullwidth */}
                <Separator />
                <div className='flex flex-row justify-between items-center'>
                    <Label htmlFor='configs:fullwidth'>Fullwidth</Label>
                    <Switch
                        id='configs:fullwidth'
                        checked={fullwidth}
                        onCheckedChange={setFullwidth}
                    />
                </div>

                {/* Date */}
                <Separator />
                <div className='flex flex-row justify-between items-center'>
                    <Label htmlFor='configs:date'>Show Date</Label>
                    <Switch id='configs:date' checked={date} onCheckedChange={setDate} />
                </div>

                {/* Theme */}
                <Separator />
                <div className='flex flex-row justify-between items-center'>
                    <Label htmlFor='configs:theme'>Theme</Label>

                    <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className='w-[140px] bg-white'>
                            <SelectValue placeholder='Default theme' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='default'>{capitalize('default')}</SelectItem>
                                {Object.keys(themes).map(theme => (
                                    <SelectItem key={`configs:theme-item-${theme}`} value={theme}>
                                        {capitalize(theme)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Icon */}
                <Separator />
                <div className='flex flex-row justify-between items-center'>
                    <Label htmlFor='configs:icon'>Icon</Label>

                    <div className='flex flex-row items-center gap-1'>
                        <Button
                            variant='outline'
                            size='icon'
                            className={cn({
                                'ring-2 ring-blue-500': icon === 'hidden',
                            })}
                            onClick={() => setIcon('hidden')}
                        >
                            <SquareDashed />
                        </Button>
                        <Button
                            variant='outline'
                            size='icon'
                            className={cn({
                                'ring-2 ring-blue-500': icon === 'random',
                            })}
                            onClick={() => setIcon('random')}
                        >
                            <Shuffle />
                        </Button>
                        <IconPicker
                            triggerPlaceholder='Custom'
                            value={icon !== 'hidden' && icon !== 'random' ? icon : undefined}
                            className={cn({
                                'ring-2 ring-blue-500': icon !== 'hidden' && icon !== 'random',
                            })}
                            onValueChange={setIcon}
                        />
                    </div>
                </div>

                {/* Greetings */}
                <Separator />
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <Label htmlFor='configs:greetings'>Greetings</Label>
                        <Switch
                            id='configs:greetings'
                            checked={greetingsShow}
                            onCheckedChange={setGreetingsShow}
                        />
                    </div>

                    <div className={cn('flex flex-row gap-2')}>
                        <Input
                            className='bg-white'
                            placeholder={greetingsPlaceholder}
                            defaultValue={greetings}
                            disabled={!greetingsShow}
                            onChange={ev => setGreetings(ev.target.value)}
                        />
                    </div>
                </div>

                {/* Target */}
                <Separator />
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <Label htmlFor='configs:target'>Target</Label>
                    </div>

                    <div className={cn('flex flex-row gap-2')}>
                        <Input
                            className='bg-white'
                            placeholder='http://...'
                            defaultValue={target}
                            onChange={ev => setTarget(ev.target.value)}
                        />
                    </div>
                </div>

                {/* Frame & Dark */}
                <Separator />
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <Label htmlFor='configs:frame'>Frame</Label>

                        <div className='flex flex-row gap-2 items-center justify-end'>
                            <Label htmlFor='configs:dark' className='font-normal text-xs'>
                                Dark Scheme
                            </Label>
                            <Switch
                                id='configs:dark'
                                className='scale-75'
                                checked={dark}
                                onCheckedChange={setDark}
                            />
                        </div>
                    </div>

                    <div className={cn('flex flex-row gap-2')}>
                        <Input
                            className='bg-white'
                            placeholder='http://...'
                            defaultValue={frame}
                            disabled={!greetingsShow}
                            onChange={ev => setFrame(ev.target.value)}
                        />
                    </div>
                </div>

                {/* BG */}
                <Separator />
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <Label htmlFor='configs:bg'>Background</Label>
                    </div>

                    <div className={cn('flex flex-row gap-2')}>
                        <TagInput
                            placeholder='Add classes'
                            delimiterList={[' ', ',', ';']}
                            delimiter=' '
                            tags={bg}
                            setTags={setBg}
                            autocompleteOptions={tailwindSuggestions}
                            allowAutocomplete
                            addOnPaste
                        />
                    </div>
                </div>

                {/* Border */}
                <Separator />
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <Label htmlFor='configs:border'>Border</Label>
                    </div>

                    <div className={cn('flex flex-row gap-2')}>
                        <TagInput
                            placeholder='Add classes'
                            delimiterList={[' ', ',', ';']}
                            delimiter=' '
                            tags={border}
                            setTags={setBorder}
                            autocompleteOptions={tailwindSuggestions}
                            allowAutocomplete
                            addOnPaste
                        />
                    </div>
                </div>

                {/* Scheme */}
                <Separator />
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <Label htmlFor='configs:scheme'>Scheme</Label>
                    </div>

                    <div className={cn('flex flex-row gap-2')}>
                        <TagInput
                            placeholder='Add classes'
                            delimiterList={[' ', ',', ';']}
                            delimiter=' '
                            tags={scheme}
                            setTags={setScheme}
                            autocompleteOptions={tailwindSuggestions}
                            allowAutocomplete
                            addOnPaste
                        />
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
}
