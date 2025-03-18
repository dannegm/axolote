import { randomPick } from '@/modules/core/helpers/arrays';
import { cn } from '@/modules/core/helpers/utils';
import { memo } from 'react';

const colorsKeys = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'white',
];

export const Tapes = {
    CROSS_FULL: 'CROSS_FULL',
    CROSS_A: 'CROSS_A',
    CROSS_B: 'CROSS_B',
    CROSS_TOP: 'CROSS_TOP',
    TOP: 'TOP',
    TOP_SMALL: 'TOP_SMALL',
};

const TopTape = ({ className, ...props }) => (
    <div
        className={cn(
            'absolute h-4 -top-1.5 left-1/2 transform -translate-x-1/2 pointer-events-none',
            'bg-(--tape-color) opacity-50',
            'border-x border-dotted border-x-(--tape-edge-color)',
            className,
        )}
        {...props}
    />
);

const CrossTape = ({ className, ...props }) => (
    <div
        className={cn(
            'absolute inset-0 pointer-events-none',
            'adjacents:absolute adjacents:w-12 adjacents:h-4 adjacents:bg-(--tape-color) adjacents:opacity-50 adjacents:border-x adjacents:border-x-(--tape-edge-color) adjacents:border-dashed adjacents:origin-center',
            className,
        )}
        {...props}
    />
);

function PaperNote({ className, color, tape, children }) {
    const shadowSizes = ['1px', '2px', '3px'];
    const shadowSize = randomPick(shadowSizes);

    const colorKey = color || randomPick(colorsKeys);
    const paperColor = `var(--color-${colorKey}-100)`;
    const paperColorDark = `var(--color-${colorKey}-200)`;
    const paperColorText = `var(--color-${colorKey}-950)`;

    const tapeVariant = tape || randomPick(Object.keys(Tapes));

    return (
        <div
            data-layer='shadow'
            className={cn(
                'relative isolate adjacents:absolute adjacents:bottom-3 adjacents:w-24 adjacents:h-2.5 adjacents:-z-1 adjacents:shadow-[0_5px_14px_rgba(0,0,0,.7)]',
                'before:left-4 before:-skew-3 before:-rotate-3',
                'after:right-4 after:skew-3 after:rotate-3',
                className,
            )}
        >
            <div
                data-layer='paper'
                style={{
                    '--tape-color': '#dbd8be',
                    '--tape-edge-color': '#b7b49d',
                    '--paper-shadow': `${shadowSize} ${shadowSize} 2px ${paperColorDark}`,
                    '--paper-color': paperColor,
                    '--paper-color-dark': paperColorDark,
                    '--paper-color-text': paperColorText,
                }}
                className={cn(
                    'relative flex flex-col flex-center gap-2 min-w-[200px] max-w-[280px] px-4 py-6',
                    'font-caveat text-(--paper-color-text) text-xl text-center leading-4 shadow-sm',
                    'bg-(--paper-color) bg-linear-to-br/srgb from-(--paper-color-dark) to-30% to-transparent',
                    'adjacents:absolute adjacents:inset-0 adjacents:opacity-75 adjacents:mix-blend-overlay',
                    'after:bg-linear-to-b after:from-transparent after:via-[50%] after:via-(--paper-color-dark) after:to-[51%] after:to-transparent',
                    'before:bg-linear-to-r before:from-transparent before:via-[50%] before:via-(--paper-color-dark) before:to-[51%] before:to-transparent',
                )}
            >
                {tapeVariant === Tapes.TOP && (
                    <TopTape data-layer='tape-top' data-variant='full' className='w-[105%]' />
                )}
                {tapeVariant === Tapes.TOP_SMALL && (
                    <TopTape data-layer='tape-top' data-variant='small' className='w-16' />
                )}

                {(tapeVariant === Tapes.CROSS_A || tapeVariant === Tapes.CROSS_FULL) && (
                    <CrossTape
                        data-layer='tape-crossing'
                        data-variant='a'
                        className={cn(
                            'adjacents:-rotate-45',
                            'after:-left-4 after:top-0',
                            'before:-right-4 before:bottom-0',
                        )}
                    />
                )}

                {(tapeVariant === Tapes.CROSS_B || tapeVariant === Tapes.CROSS_FULL) && (
                    <CrossTape
                        data-layer='tape-crossing'
                        data-variant='b'
                        className={cn(
                            'adjacents:rotate-45',
                            'after:-right-4 after:top-0',
                            'before:-left-4 before:bottom-0',
                        )}
                    />
                )}

                {tapeVariant === Tapes.CROSS_TOP && (
                    <CrossTape
                        data-layer='tape-crossing'
                        data-variant='top'
                        className={cn(
                            'after:origin-center after:-left-4 after:top-0 after:-rotate-45',
                            'before:origin-center before:-right-4 before:top-0 before:rotate-45',
                        )}
                    />
                )}

                {children}
            </div>
        </div>
    );
}

export default memo(PaperNote);
