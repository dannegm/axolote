'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as PrimitiveEmblor from 'emblor';
import Fuse from 'fuse.js';

import { cn } from '@/modules/shadcn/lib/utils';
import { Badge } from '@/modules/shadcn/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shadcn/ui/popover';

export function TagInput({
    className,
    classNames,
    allowAutocomplete = false,
    autocompleteOptions = [],
    tags,
    setTags,
    onBlur,
    onTagAdd,
    onInputChange,
    ...props
}) {
    const [activeTagIndex, setActiveTagIndex] = useState();
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const $input = useRef();
    const $fuse = useRef();

    const handleTagAdd = ev => {
        setResults([]);
        onTagAdd?.(ev);
    };

    const handleInputChange = ev => {
        setInput(ev);
        onInputChange?.(ev);
    };

    const handleAcceptSuggestion = item => {
        const newTags = [...tags];
        newTags.push({
            id: `s-${Date.now()}`,
            text: item,
        });

        setTags(newTags);
        setResults([]);
    };

    useEffect(() => {
        $fuse.current = new Fuse(autocompleteOptions);
    }, [autocompleteOptions]);

    useEffect(() => {
        if (allowAutocomplete && input.trim() !== '' && $fuse.current) {
            const searchResults = $fuse.current.search(input, {
                limit: 10,
            });
            setResults(searchResults);
        } else {
            setResults([]);
        }
    }, [input, allowAutocomplete]);

    return (
        <div className={cn('relative flex-1 inline-block', className)}>
            <PrimitiveEmblor.TagInput
                ref={$input}
                styleClasses={{
                    inlineTagsContainer: cn(
                        'border-input rounded-md bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1',
                        className,
                        classNames?.container,
                    ),
                    input: cn(
                        'w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7',
                        classNames?.input,
                    ),
                    tag: {
                        body: cn(
                            'h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 flex',
                            classNames?.tag,
                        ),
                        closeButton: cn(
                            'absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground',
                            classNames?.closeButton,
                        ),
                    },
                }}
                activeTagIndex={activeTagIndex}
                setActiveTagIndex={setActiveTagIndex}
                tags={tags}
                setTags={setTags}
                onTagAdd={handleTagAdd}
                onInputChange={handleInputChange}
                {...props}
            />

            {Boolean(results.length) && (
                <div
                    className={cn(
                        'absolute z-50 flex flex-row flex-wrap gap-1 p-2 mt-1 rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md outline-hidden ',
                    )}
                >
                    {results.map(tag => (
                        <Badge
                            key={`tag-suggestion-${tag.item}-${tag.refIndex}`}
                            className='cursor-pointer'
                            variant='outline'
                            onClick={() => handleAcceptSuggestion(tag.item)}
                        >
                            {tag.item}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
